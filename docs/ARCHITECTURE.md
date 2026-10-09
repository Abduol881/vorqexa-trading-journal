# Architecture

## Product boundary
Vorqexa Journal is standalone. Manual entry and CSV import work without any trading-account connection. Automatic journaling is restricted to eligible trades executed through Vorqexa DEX. External broker/exchange integrations are out of scope for the initial release.

## Runtime components
- **Web:** Next.js App Router for pages, server components and short request/response route handlers.
- **Application/domain:** TypeScript use cases, validation and framework-independent trading rules.
- **Database/auth/storage:** Supabase PostgreSQL, Supabase Auth, Row-Level Security (RLS), private object storage.
- **Sync worker:** scheduled/background processing for Orderly data after the integration is verified. Do not rely on a web request to run long synchronization jobs.
- **CI:** GitHub Actions for typecheck, lint, unit tests and production build.

## Dependency direction
Routes/UI call application services. Application services validate input and depend on domain rules plus repository/provider interfaces. Data adapters implement those interfaces. Domain calculations must not depend on Next.js, Supabase or provider SDKs. Analytics reuses the same domain P&L rules as trade detail views.

## Import flow
Manual form and CSV preview/import -> validation -> normalized trade input -> application service -> repository -> shared trade history.
Vorqexa DEX sync -> authenticated provider adapter -> normalized executions -> idempotent execution store -> reconciliation/grouping -> shared trade history.
All paths preserve provenance. Provider sync must not overwrite user-authored notes or tags.

## Core records
Profile/preferences; normalized Trade; individual Execution; linked TradingAccount; ImportRun/sync state; JournalEntry; Tag/TradeTag; future private attachment metadata.

## Accounting
Closed long gross P&L = (exit - entry) * quantity. Closed short gross P&L = (entry - exit) * quantity. Net P&L = gross P&L - fees + signed funding (positive means received). Open trades have no realized P&L. Order, execution and grouped position are distinct concepts. Multi-fill positions must be grouped using documented, tested rules before analytics are authoritative. Use PostgreSQL numeric for financial values and define rounding at API/UI boundaries.

## Tenant isolation
Derive user identity from a verified Supabase session. Never trust a client-supplied user ID. Every user-owned table has RLS and ownership-safe foreign keys. Service credentials must never reach the browser. RLS is the security boundary; repository scoping is defense in depth.

## Integration constraints
A Vorqexa broker ID, wallet connection or public market-data access does not prove permission to read private user executions. Verify Orderly private API access, account binding, history pagination, rate limits, authentication and revocation behavior before implementation. Automatic sync is unavailable until this gate passes.
