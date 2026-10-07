---
id: db-commit-one-fsync
kind: basic
version: 1
level: 4
tags: [databases, durability, storage]
requires:
  - db-wal-commit-durable
refs:
  - https://www.postgresql.org/docs/current/wal-intro.html
---

## A transaction dirtied 1 000 pages scattered across a table. Why does its commit still cost a single fsync?

---

**Commit flushes only the sequential log tail; the pages are written later, in the background.**

One sequential write and one durability barrier, independent of how many
pages changed or where they live. The checkpointer writes the dirty
pages long after the client has its answer.
