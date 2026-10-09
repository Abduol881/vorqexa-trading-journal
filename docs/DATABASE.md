# Database model

The initial migration establishes profiles, trades, journal entries and tags with RLS. Migration `0002_import_pipeline.sql` adds import/sync foundations without rewriting the initial migration.

## Tables
- `profiles`: one row per authenticated user; timezone and display preferences.
- `trades`: normalized journal-level trade; source is `manual`, `csv`, or `vorqexa_dex`.
- `trading_accounts`: explicitly linked Vorqexa DEX/Orderly account. Store provider identifiers and sync metadata, not wallet secrets.
- `executions`: individual provider fills with stable external execution IDs and decimal-safe values.
- `import_runs`: manual/CSV/DEX run status and row counters.
- `journal_entries`, `tags`, `trade_tags`: user-owned review content and categorization.

## Integrity
- Use RLS on every user-owned table.
- Composite foreign keys ensure linked rows share a user.
- Unique provider execution identity per linked account provides idempotency.
- Keep raw provider payloads out of normal UI responses; minimize and restrict any retained payloads.
- A wallet address alone is not authorization to private trading data.
- Store financial values in PostgreSQL numeric columns and define rounding at boundaries.

## Migration practice
Never silently rewrite a migration already applied to a shared environment. Add a new numbered migration for schema evolution. Validate migrations in a disposable Supabase project and add SQL/RLS tests before production.
