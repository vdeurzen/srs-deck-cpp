---
id: db-wal-commit-durable
kind: basic
version: 1
level: 4
tags: [databases, durability, storage]
requires:
  - db-wal-and-commit
refs:
  - https://www.postgresql.org/docs/current/wal-intro.html
  - https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf
elaborate: Postgres's `synchronous_commit = off` acknowledges before this point. What can a crash then lose, and what can it never corrupt?
---

## When may a database acknowledge `COMMIT` to the client?

---

**Once the transaction's log records, through its commit record, are on stable storage.**

The data pages may still be dirty in memory. After a crash, redo replays
the log onto whatever reached the disk, so a committed transaction is
never lost.
