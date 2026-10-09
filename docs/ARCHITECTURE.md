# Architecture

## Initial shape

A single Next.js application, a separate Supabase project, and PostgreSQL. Avoid microservices until concrete scaling or isolation requirements justify them.

## Layers

- UI: pages, accessible components, forms, charts.
- Features: trade management, journal notes, analytics, account settings.
- Domain: validated types and deterministic financial calculations.
- Server: authorization, request validation, database access, and integration adapters.
- Persistence: PostgreSQL migrations, constraints, and row-level security.
- Integration workers: scheduled sync jobs added only after provider access is verified.

## Data flow

1. Authenticate the user.
2. Validate input on the server.
3. Enforce ownership in both server logic and database RLS.
4. Persist normalized records.
5. Calculate metrics from canonical records.
6. Present values with definitions and date/time context.

## Independence

Do not import source files or secrets from the Vorqexa DEX repository. Any future cross-product integration must use a documented and authenticated interface.

## Financial data

Use appropriate decimal precision for prices, quantities, fees, and monetary values. Avoid relying on binary floating-point arithmetic for authoritative financial calculations. Keep fills distinct from summarized trades where needed, and document how partial closes, funding, fees, and unrealized PnL are handled.
