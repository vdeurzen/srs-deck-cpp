---
id: db-mvcc
kind: basic
version: 1
level: 4
tags: [databases, concurrency, transactions]
requires:
  - db-isolation-snapshots
refs:
  - https://www.vldb.org/pvldb/vol10/p781-Wu.pdf
  - https://www.postgresql.org/docs/current/mvcc-intro.html
elaborate: Under MVCC a reader never waits for a writer. What does the system pay instead, and when?
---

## Under MVCC, an `UPDATE` does not overwrite the row. What does it do instead?

---

**It writes a new version stamped with its transaction, and marks the old one superseded.**

In Postgres the new version records its creator in `xmin`; the old one
records the updater in `xmax` and points to the new one (`t_ctid`).
Each reader picks the version its snapshot can see, so readers never
block writers.
