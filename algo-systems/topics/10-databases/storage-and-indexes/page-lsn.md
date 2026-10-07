---
id: db-page-lsn
kind: basic
version: 1
level: 4
tags: [databases, durability, recovery]
requires:
  - db-wal-and-commit
refs:
  - https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf
---

## During ARIES redo, a log record for page P is replayed. How does recovery know whether P already contains that change?

---

**P stores the LSN of its last applied change; records at or below it are skipped.**

So redo is idempotent: a page flushed just before the crash is not
changed twice, and a crash during recovery is harmless, since running
redo again skips what the first run applied.
