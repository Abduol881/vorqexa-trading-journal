# Sync worker (planned)

This directory documents the future deployable background worker; it is not yet a running service. A production worker should process eligible Vorqexa DEX sync jobs with idempotency, bounded retries, persisted checkpoints, provider rate-limit handling and safe logs. Do not run long sync loops in web request handlers.
