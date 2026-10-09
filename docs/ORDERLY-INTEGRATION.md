# Orderly integration boundary

Orderly sync is optional and later. Manual entry and CSV must remain useful without it.

Before implementation:
1. Verify current official Orderly docs, endpoints, auth scheme, and data permissions.
2. Do not assume a broker ID or DEX Creator configuration grants private user trade-history access.
3. Obtain explicit user consent and disclose imported data.
4. Keep provider types inside an adapter and map into the normalized journal model.
5. Use stable external IDs; handle pagination, partial fills, fees, funding, corrections and rate limits.
6. Never request seed phrases/private keys or store withdrawal-enabled credentials.
7. Test duplicate imports, retries, revoked access and provider outages.

Suggested future module: `src/features/integrations/orderly/{api-client,schemas,mapper,sync-service}.ts`. No live integration exists in this foundation.
