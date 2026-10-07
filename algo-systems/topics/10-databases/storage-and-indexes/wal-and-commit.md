---
id: db-wal-and-commit
kind: basic
version: 2
level: 4
tags: [databases, durability, storage]
requires:
  - db-buffer-pool
refs:
  - https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf
  - https://www.postgresql.org/docs/current/wal-intro.html
---

## The buffer pool wants to write a dirty page back to disk. Under write-ahead logging, what must already be true?

---

**The log records describing that page's changes are already durable.**

If the page reached disk first and the system crashed, it could hold
changes of an uncommitted transaction with no log record saying how to
undo them. Each page stores the LSN of its last change; the log must be
flushed at least that far.
