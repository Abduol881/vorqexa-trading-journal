# Vorqexa Journal

A standalone trading journal foundation—not a production-ready application yet.

## Principles
- Manual journaling works without an exchange connection.
- Every user's data is private and scoped to their authenticated identity.
- Domain calculations are the single source of truth for analytics.
- Provider integrations are optional adapters, never core dependencies.
- Never request or store wallet seed phrases or private keys.

## Architecture
See `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/SECURITY.md`, and `docs/ORDERLY-INTEGRATION.md`.

Stack: Next.js App Router, TypeScript, Supabase Auth/PostgreSQL with RLS, Zod validation, Vitest.

## Local setup
1. Use Node.js 22+ and pnpm 10.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env.local` and configure the public Supabase URL and anon key.
4. Run `pnpm dev`.

## Status
Foundation files, domain PnL helper, initial schema/RLS, tests, docs and CI scaffold are present. Authentication UI, protected routes, database-backed trade CRUD, journal screens, import/export and Orderly sync are not implemented yet. Dashboard figures are placeholders, not real account data.

Commands: `pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
