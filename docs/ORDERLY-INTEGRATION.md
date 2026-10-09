# Orderly integration boundary

## Scope
Automatic journaling is limited to eligible trades executed through Vorqexa DEX. Manual entry and CSV import remain independent. External broker/exchange connectors are not in scope for the initial release.

## Gate before implementation
1. Verify current official Orderly API documentation for private execution history, pagination, fees/funding, account identifiers, authentication, rate limits and retention.
2. Verify how the journal proves the user is authorized for the corresponding Orderly account.
3. Confirm historical and ongoing data access for the actual Vorqexa DEX setup.
4. Do not assume a broker ID, wallet connection or public market data grants private user-history access.
5. Document required permissions; prefer least-privilege/read-only authorization where supported. Never request seed phrases or private keys.
6. Define revocation, retries, outages, duplicate handling and reconciliation.

## Adapter boundary
Planned server-only modules:
- `schemas.ts`: validate provider payloads.
- `mapper.ts`: map verified payloads to internal execution records.
- `client.ts`: provider API client.
- `sync-service.ts`: pagination, checkpoints and idempotent ingestion.
- `services/sync-worker/`: scheduled processing when deployment requirements are chosen.

Provider types must not leak into the core trade domain. Keep credentials server-side. No live integration is implemented until the gate above is complete.
