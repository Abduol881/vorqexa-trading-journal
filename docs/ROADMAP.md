# Roadmap

## Foundation
- [x] Layered code structure and product/security docs
- [x] Trade domain model, input schema, pure PnL helper and unit tests
- [x] Initial database schema and user-scoped RLS
- [ ] Install dependencies and verify build/typecheck/lint/tests
- [ ] Validate migration in a disposable Supabase project

## Milestone 1: secure account
- [ ] Sign up/in/out and password recovery
- [ ] Session refresh and protected routes
- [ ] Profile preferences and timezone
- [ ] Automated cross-user RLS tests

## Milestone 2: manual journal
- [ ] Authenticated trade CRUD
- [ ] Notes, tags, filtering and pagination
- [ ] Real database-backed dashboard and analytics
- [ ] Test PnL edge cases and form errors

## Milestone 3: portability
- [ ] CSV preview/import/deduplication
- [ ] User-controlled export and account deletion
- [ ] Backup and restore procedure

## Milestone 4: optional integration
- [ ] Verify official Orderly API access and permissions
- [ ] Read-only adapter, explicit consent, reconciliation and sync status

Do not call this production-ready until security tests, migrations, recovery, data export/deletion, and deployment configuration are verified.
