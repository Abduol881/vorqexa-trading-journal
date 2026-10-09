# Vorqexa Journal

A standalone trading journal for reviewing execution quality, risk, and trading decisions.

## Product rules
- Manual journaling works without a trading-account connection; users may also import supported CSV files.
- Automatic journaling is limited to eligible trades executed through Vorqexa DEX. External broker/exchange connectors are out of scope for the initial release.
- Both import paths feed one normalized trade history and one analytics engine.
- Automatic sync requires verified authorization to access private Orderly account data.
- Never request or store wallet seed phrases or private keys.

## Stack
Next.js App Router, TypeScript, Supabase Auth/PostgreSQL with Row-Level Security, Zod and Vitest. A separate sync worker may be deployed when Orderly sync is ready.

## Local setup
1. Use Node.js 22+ and pnpm 10.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env.local` and set the public Supabase URL and anon key.
4. Run `pnpm dev`.

## Quality commands
`pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`.

## Status
Foundation scaffold only, not production-ready. Authentication screens, protected routes, database-backed trade CRUD, CSV import, real analytics and Orderly sync still need implementation and verification. Dashboard sample values must never be presented as real user data.

## Documentation
[Architecture](docs/ARCHITECTURE.md) · [Product](docs/PRODUCT.md) · [Branding](docs/BRANDING.md) · [Database](docs/DATABASE.md) · [Imports](docs/IMPORTS.md) · [Security](docs/SECURITY.md) · [Orderly integration gate](docs/ORDERLY-INTEGRATION.md) · [Roadmap](docs/ROADMAP.md)
