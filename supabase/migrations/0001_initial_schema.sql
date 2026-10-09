create extension if not exists pgcrypto;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text, timezone text not null default 'UTC',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.trades (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 instrument text not null check(char_length(instrument) between 1 and 40),
 market_type text not null default 'perpetual' check(market_type in ('spot','perpetual','future','other')),
 side text not null check(side in ('long','short')),
 status text not null default 'open' check(status in ('open','closed')),
 quantity numeric(30,12) not null check(quantity>0),
 entry_price numeric(30,12) not null check(entry_price>0),
 exit_price numeric(30,12) check(exit_price is null or exit_price>0),
 fees numeric(30,12) not null default 0 check(fees>=0), funding numeric(30,12) not null default 0,
 stop_loss numeric(30,12) check(stop_loss is null or stop_loss>0),
 take_profit numeric(30,12) check(take_profit is null or take_profit>0),
 opened_at timestamptz not null, closed_at timestamptz,
 setup text check(setup is null or char_length(setup)<=3000),
 source text not null default 'manual' check(source in ('manual','csv','orderly')), external_id text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check((status='open' and exit_price is null and closed_at is null) or (status='closed' and exit_price is not null and closed_at is not null)),
 unique(user_id,id), unique(user_id,source,external_id)
);
create index trades_user_opened_at_idx on public.trades(user_id,opened_at desc);
create index trades_user_status_idx on public.trades(user_id,status);
create index trades_user_instrument_idx on public.trades(user_id,instrument);

create table public.journal_entries (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 trade_id uuid, title text not null check(char_length(title) between 1 and 160),
 body text not null default '' check(char_length(body)<=12000), mood text,
 lesson text check(lesson is null or char_length(lesson)<=3000),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 foreign key(user_id,trade_id) references public.trades(user_id,id) on delete cascade
);
create table public.tags (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(char_length(name) between 1 and 40), created_at timestamptz not null default now(),
 unique(user_id,name), unique(user_id,id)
);
create table public.trade_tags (
 user_id uuid not null references auth.users(id) on delete cascade,
 trade_id uuid not null, tag_id uuid not null, created_at timestamptz not null default now(),
 primary key(trade_id,tag_id),
 foreign key(user_id,trade_id) references public.trades(user_id,id) on delete cascade,
 foreign key(user_id,tag_id) references public.tags(user_id,id) on delete cascade
);

alter table public.profiles enable row level security;
alter table public.trades enable row level security;
alter table public.journal_entries enable row level security;
alter table public.tags enable row level security;
alter table public.trade_tags enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy profiles_insert_own on public.profiles for insert to authenticated with check(id=(select auth.uid()));
create policy profiles_update_own on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create policy trades_select_own on public.trades for select to authenticated using(user_id=(select auth.uid()));
create policy trades_insert_own on public.trades for insert to authenticated with check(user_id=(select auth.uid()));
create policy trades_update_own on public.trades for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy trades_delete_own on public.trades for delete to authenticated using(user_id=(select auth.uid()));
create policy journal_entries_select_own on public.journal_entries for select to authenticated using(user_id=(select auth.uid()));
create policy journal_entries_insert_own on public.journal_entries for insert to authenticated with check(user_id=(select auth.uid()));
create policy journal_entries_update_own on public.journal_entries for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy journal_entries_delete_own on public.journal_entries for delete to authenticated using(user_id=(select auth.uid()));
create policy tags_select_own on public.tags for select to authenticated using(user_id=(select auth.uid()));
create policy tags_insert_own on public.tags for insert to authenticated with check(user_id=(select auth.uid()));
create policy tags_update_own on public.tags for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy tags_delete_own on public.tags for delete to authenticated using(user_id=(select auth.uid()));
create policy trade_tags_select_own on public.trade_tags for select to authenticated using(user_id=(select auth.uid()));
create policy trade_tags_insert_own on public.trade_tags for insert to authenticated with check(user_id=(select auth.uid()));
create policy trade_tags_delete_own on public.trade_tags for delete to authenticated using(user_id=(select auth.uid()));

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=''
as $$
begin
 insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'display_name',''));
 return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
