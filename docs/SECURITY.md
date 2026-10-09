# Security baseline

- Never request or store seed phrases, private keys, or exchange withdrawal credentials.
- Only the Supabase URL and anon key may be public; RLS is still mandatory.
- Never commit real env files, service-role keys, tokens, or provider secrets.
- Derive user identity from a verified session, never a client-supplied user ID.
- Validate server inputs and enforce constraints in the database too.
- Enable and test RLS for all user-owned tables and future storage objects.
- Keep uploads private; check ownership on each object operation.
- Use least privilege and read-only provider access where supported.
- Do not log tokens or unnecessary private trading data.
- Add rate limiting, data export/deletion, cross-user access tests, backups and restore tests before launch.
- Review this starter migration in a disposable development Supabase project before production.
