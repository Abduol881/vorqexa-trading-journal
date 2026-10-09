# Import contracts

## Supported methods
- **Manual:** create/edit journal trades directly.
- **CSV:** upload, preview, map columns, validate, deduplicate where reliably identifiable, then confirm.
- **Automatic:** import eligible executions from Vorqexa DEX only, after verified Orderly private API authorization and account linkage.

Third-party broker/exchange connectors are not in the initial scope.

## Shared pipeline
Each source is normalized and validated before persistence. All resulting trades are available to the same history, journal and analytics engine. Keep source provenance. Provider sync must not overwrite user-authored journal content.

## CSV lifecycle
1. Upload to a size/type-limited parser.
2. Preview rows and map source columns to canonical fields.
3. Validate each row; report row number and safe, actionable errors.
4. Detect duplicates using explicit external IDs where present and conservative matching otherwise.
5. Require confirmation before writing; show imported/skipped/rejected counts.
6. Record the import run and allow safe retry without duplicating accepted rows.

## Automatic lifecycle
1. User explicitly connects the eligible Vorqexa DEX account.
2. Server verifies identity/account relationship using supported Orderly authorization.
3. Backfill paginated historical executions if the provider supports it.
4. Incrementally sync from a persisted checkpoint.
5. Normalize and persist executions idempotently.
6. Reconcile executions into journal trades using documented rules.
7. Expose last successful sync, status and recoverable errors; handle revoked access and rate limits.

## Accounting caution
An order is not an execution, and an execution is not necessarily a complete position. Partial fills, fees, funding, realized P&L and position closure must be modeled distinctly. Do not present execution-level data as complete closed-trade analytics until reconciliation rules are verified and tested.
