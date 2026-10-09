# Product definition

Vorqexa Journal helps traders record what they traded, why they entered, how they managed risk and what they learned.

## Product rules
1. Manual trade entry works without connecting a wallet or exchange.
2. CSV import supports historical records through preview, mapping, validation and duplicate handling.
3. Automatic import is only for eligible executions made through Vorqexa DEX. No external broker/exchange integrations are in scope for the first release.
4. Both import paths share one normalized trade history, journal and analytics engine.
5. Imported data is traceable to its source. Sync is idempotent and recoverable.
6. Provider sync never overwrites user-authored notes, tags or journal content.

## Main workspace
- Dashboard: summary metrics, performance views and recent trades; no fake values presented as real.
- Trades: searchable/filterable trade history, details, source and lifecycle status.
- Journal: notes, lessons, tags, discipline fields and private attachments.
- Analytics: net P&L, win rate, average result, profit factor and additional metrics once definitions/tests exist.
- Imports: manual entry, CSV import and Vorqexa DEX sync status.
- Settings: profile, timezone, data export, account/data deletion and connection management.

## First release milestones
1. Secure account/session and user isolation.
2. Manual trade CRUD, journal entries, tags and useful empty/error states.
3. CSV import/export, preview, validation and duplicate handling.
4. Real dashboard and analytics from persisted records.
5. Vorqexa DEX automatic sync only after API permissions/account-linking are verified.
6. Production hardening, export/deletion, backup/restore and observability.

## Non-goals
No trade execution, custody, seed phrase/private key collection, mandatory exchange connection, third-party broker integrations in the initial release, or financial advice.

## Acceptance
The journal works without a connection; no account can access another user's data; P&L is documented/tested; duplicate imports do not duplicate executions; sync failures are visible; users can export data and request deletion. Production claims require passing CI, security/RLS tests and migration/recovery verification.
