-- Adds provenance and synchronization foundations for manual, CSV, and Vorqexa DEX imports.
-- Keep 0001 immutable for environments where it may already have been applied.
begin;

-- Drop the previous source constraint before migrating legacy values.
alter table public.trades drop constraint if exists trades_source_check;
update public.trades set source = 'vorqexa_dex' where source = 'orderly';
alter table public.trades add constraint trades_source_check
  check (source in ('manual', 'csv', 'vorqexa_dex'));

create table public.trading_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider = 'orderly'),
  provider_account_id text not null check (char_length(provider_account_id) between 1 and 200),
  display_label text,
  status text not null default 'pending'
    check (status in ('pending', 'connected', 'reauthorization_required', 'disconnected', 'error')),
  last_synced_at timestamptz,
  next_cursor jsonb,
  last_error_code text check (last_error_code is null or char_length(last_error_code) <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, id),
  unique (user_id, provider, provider_account_id)
);

create table public.executions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trading_account_id uuid not null,
  external_execution_id text not null check (char_length(external_execution_id) between 1 and 200),
  external_order_id text,
  instrument text not null check (char_length(instrument) between 1 and 40),
  side text not null check (side in ('buy', 'sell', 'long', 'short')),
  quantity numeric(30,12) not null check (quantity > 0),
  price numeric(30,12) not null check (price > 0),
  fee numeric(30,12) not null default 0 check (fee >= 0),
  funding numeric(30,12) not null default 0,
  realized_pnl numeric(30,12),
  executed_at timestamptz not null,
  payload_version integer not null default 1 check (payload_version > 0),
  created_at timestamptz not null default now(),
  unique (trading_account_id, external_execution_id),
  foreign key (user_id, trading_account_id)
    references public.trading_accounts(user_id, id) on delete cascade,
  unique (user_id, id)
);

create index executions_user_executed_at_idx on public.executions(user_id, executed_at desc);
create index executions_account_executed_at_idx on public.executions(trading_account_id, executed_at desc);

create table public.import_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('manual', 'csv', 'vorqexa_dex')),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'completed_with_errors', 'failed')),
  rows_seen integer not null default 0 check (rows_seen >= 0),
  rows_imported integer not null default 0 check (rows_imported >= 0),
  rows_skipped integer not null default 0 check (rows_skipped >= 0),
  rows_failed integer not null default 0 check (rows_failed >= 0),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  error_code text check (error_code is null or char_length(error_code) <= 100),
  created_at timestamptz not null default now(),
  check (rows_imported + rows_skipped + rows_failed <= rows_seen)
);

create index import_runs_user_created_at_idx on public.import_runs(user_id, created_at desc);

alter table public.trading_accounts enable row level security;
alter table public.executions enable row level security;
alter table public.import_runs enable row level security;

-- Only the trusted server-side connection flow can create/change account links.
create policy trading_accounts_select_own on public.trading_accounts
  for select to authenticated using (user_id = (select auth.uid()));

create policy executions_select_own on public.executions
  for select to authenticated using (user_id = (select auth.uid()));
-- No authenticated client writes to executions; trusted sync service writes them.

create policy import_runs_select_own on public.import_runs
  for select to authenticated using (user_id = (select auth.uid()));
create policy import_runs_insert_own on public.import_runs
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy import_runs_update_own on public.import_runs
  for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

commit;
