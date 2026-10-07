---
id: db-fsyncgate
kind: basic
version: 1
level: 4
tags: [databases, durability, linux, misconception]
requires:
  - db-wal-and-commit
refs:
  - https://wiki.postgresql.org/wiki/Fsync_Errors
  - https://www.postgresql.org/docs/current/runtime-config-error-handling.html
elaborate: Where in your own code is a failed write or flush retried on the assumption that the data is still buffered somewhere?
---

## A checkpoint's `fsync` fails with `EIO`; the engine retries and the second `fsync` succeeds. Are the pages now on disk?

---

**Not necessarily: Linux may have dropped the failed pages and marked them clean.**

```c
if (fsync(fd) == -1 && fsync(fd) == 0) { /* "recovered": nothing was dirty */ }
```

The retry then has nothing to write, so its success means nothing.
Retrying feels right because `write` errors usually are transient.
Postgres (since 11.2, backpatched; `data_sync_retry = off`) now panics
instead and recovers from the WAL.
