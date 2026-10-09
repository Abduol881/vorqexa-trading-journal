# Imports feature

Owns the supported ways to add trade history:
- `manual/`: user-entered trades.
- `csv/`: preview, mapping, validation, deduplication and confirmed import.
- `automatic/`: Vorqexa DEX-only account linking and Orderly execution sync, gated on verified API permissions.

All paths normalize into the shared trade domain and preserve source provenance. No external broker connectors in the initial release.
