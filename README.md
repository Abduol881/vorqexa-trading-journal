# Vorqexa Trading Journal

A standalone trading journal for recording trades, reviewing decisions, and understanding performance. This repository is independent of the Vorqexa DEX codebase.

## Status

**Foundation stage.** The current app is a clean scaffold; authentication, database persistence, analytics calculations, and exchange synchronization are not yet implemented.

## Requirements

- Node.js 22+
- pnpm 10+
- A Supabase project (needed when authentication and persistence are implemented)

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

## Commands

- `pnpm dev` — run the development server
- `pnpm lint` — run ESLint
- `pnpm typecheck` — check TypeScript
- `pnpm build` — create a production build

## Product principles

1. Manual trade journaling must work before exchange synchronization exists.
2. Users must only access their own private records.
3. Financial metrics must be documented and tested against known examples.
4. External exchange integrations must be isolated behind adapters.
5. Never commit credentials, API secrets, private keys, or real user data.

## Documentation

- [Product plan](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Security](docs/SECURITY.md)
- [Roadmap](docs/ROADMAP.md)
- [Orderly integration research](docs/ORDERLY-INTEGRATION.md)
