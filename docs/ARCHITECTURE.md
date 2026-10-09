# Architecture

## Layers
- `src/app`: routing, page composition, route handlers.
- `src/components`: shared presentation only.
- `src/features/trades/domain`: framework-independent trade types and calculations.
- `src/features/trades/application`: input validation and use-case boundary.
- `src/features/trades/data`: repository contract; implement against the authenticated Supabase session.
- `src/features/analytics`: pure summaries derived from domain trade records.
- `src/lib/supabase`: browser/server clients; never expose service-role credentials.
- `supabase/migrations`: schema, constraints and RLS.

## Dependency direction
Routes call application services; services validate and use repositories; repositories persist under the verified session. Domain math must not depend on UI, Next.js, or Supabase. Analytics must reuse domain PnL rules.

## Core entities
Profile, Trade, JournalEntry, Tag, and TradeTag. A future attachments feature should keep object storage private and authorize each read/write.

## Accounting
Long gross PnL = (exit - entry) × quantity. Short gross PnL = (entry - exit) × quantity. Net PnL = gross PnL - fees + funding; funding is a signed cash flow, positive when received. Open trades have no realized PnL. Closed trades require exit price and close timestamp. Multi-fill execution/lot modeling may be required before reliable exchange sync.

## Tenant isolation
Supabase Auth identifies the user. Every user-owned table requires RLS. Server operations derive identity from the verified session—not a request-body user ID. Repository user scoping is defense in depth; RLS is authoritative.

## Integration boundary
Future provider adapters map verified API payloads into the normalized domain model. Integrations are optional and cannot own core accounting logic.
