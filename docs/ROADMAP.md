# Roadmap

Work in small, reviewable milestones. Each milestone should land with tests and documentation; do not claim production readiness based on scaffold code alone.

## Stage 0 — Architecture and schema foundation
- [x] Document manual/CSV import for any source and automatic sync for Vorqexa DEX only.
- [x] Define frontend/backend/domain/provider boundaries.
- [x] Add schema foundation for linked accounts, executions and import runs.
- [x] Add import-domain tests and feature directory conventions.
- [ ] Install dependencies and verify typecheck/lint/tests/build on Node 22.
- [ ] Validate migrations in a disposable Supabase project.

## Stage 1 — Secure account
- [ ] Sign up/sign in/sign out and password recovery.
- [ ] Refresh sessions and protect workspace routes.
- [ ] Profile preferences and timezone.
- [ ] Automated cross-user RLS and account lifecycle tests.

## Stage 2 — Manual journal
- [ ] Authenticated trade CRUD backed by Supabase.
- [ ] Journal notes, tags, filtering and pagination.
- [ ] Real dashboard and analytics from persisted records.
- [ ] Test P&L edge cases, precision and form validation.

## Stage 3 — CSV portability
- [ ] Safe parser, upload limits, preview and column mapping.
- [ ] Row-level validation, conservative duplicate detection and import summary.
- [ ] User-controlled export and account/data deletion.
- [ ] Backup and restore procedure.

## Stage 4 — Vorqexa DEX automatic sync
- [ ] Verify official Orderly private API/account authorization.
- [ ] Confirm historical execution access and supported fields.
- [ ] Implement server-only adapter, execution persistence, checkpointing and retries.
- [ ] Reconcile partial fills into journal trades and test idempotency.
- [ ] Add connection status, last sync, revocation and error recovery.

## Stage 5 — Production hardening
- [ ] RLS/integration security tests; migration and restore drills.
- [ ] Rate limits, observability, safe logging and operational alerts.
- [ ] Accessibility, mobile QA and performance checks.
- [ ] Production deployment and incident/recovery runbook.

External broker/exchange integrations are not planned for the initial release.
