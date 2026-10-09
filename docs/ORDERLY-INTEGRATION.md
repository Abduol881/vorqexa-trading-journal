# Orderly Integration Research

This document is a research checklist, not a claim that any particular credential or endpoint provides access.

Before implementing sync, verify from current official Orderly documentation:

- Which endpoints expose historical executions/fills, order history, fees, funding, and realized PnL.
- Whether a public indexer can retrieve the required history for the verified account.
- Whether private endpoints require user-authorized credentials and which scopes are available.
- How wallet ownership, Orderly account IDs, and subaccounts are mapped.
- Pagination, retention, rate limits, and correction semantics.
- Whether a DEX Creator API key or broker ID is unrelated to private user-history authorization.

Never assume a broker ID grants access to all users' private data. Never request wallet seed phrases or private keys.

Fallback: manual trade entry and CSV import must remain available if reliable authorized synchronization cannot be implemented.
