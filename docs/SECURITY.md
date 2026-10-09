# Security baseline

- Never request or store seed phrases or private keys.
- Only public Supabase URL/anon key belong in browser variables; RLS remains mandatory.
- Never commit real env files, service-role keys, provider credentials or tokens.
- Derive user identity from a verified session, never a client-supplied user ID.
- Enable RLS on every user-owned table and test cross-user reads/writes.
- Use composite ownership-safe foreign keys where user-owned rows reference each other.
- Store integration secrets server-side only and use least-privilege/read-only permissions where supported.
- A connected wallet or broker ID is not proof of private trade-history authorization.
- Keep uploads private and authorize every object operation.
- Validate request bodies, CSV file size/type and imported rows on the server.
- Prevent duplicate executions using database uniqueness constraints and idempotent jobs.
- Avoid logging credentials and unnecessary private trading data.
- Add rate limiting, export/deletion, backups, restore tests, dependency review and monitoring before launch.
- Validate migrations in a disposable development Supabase project before production.
