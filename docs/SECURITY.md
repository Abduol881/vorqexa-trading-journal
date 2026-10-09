# Security Plan

- Use Supabase Auth for identity, verification, recovery, and session lifecycle.
- Enable RLS on every table containing private user data.
- Test that a user cannot read, update, or delete another user's records.
- Validate authorization and input on the server; never trust frontend checks alone.
- Never expose service-role credentials or exchange API secrets to the browser.
- Keep secrets out of commits, logs, screenshots, and issue reports.
- Use least-privilege read-only API scopes for trade synchronization where supported.
- Never request wallet seed phrases or private keys.
- Rate-limit sensitive endpoints and validate uploaded/imported files.
- Minimize stored personal data and redact sensitive values from logs.
- Document export, deletion, backup, restoration, and incident response.
- Test backups by restoring them; a configured backup alone is not sufficient.

Security gates must pass before production onboarding.
