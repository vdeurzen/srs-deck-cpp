---
id: db-mvcc-undo-log
kind: basic
version: 1
level: 4
tags: [databases, transactions, storage]
requires:
  - db-mvcc
refs:
  - https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html
  - https://www.vldb.org/pvldb/vol10/p781-Wu.pdf
---

## Postgres keeps every row version in the table itself. InnoDB updates the row in place. Where are InnoDB's older versions?

---

**In the undo log: an old snapshot rebuilds its version by applying undo records.**

The table stays compact and current readers pay nothing. The cost moves
to long-lived readers, which walk undo chains, and to purge, which must
reclaim undo. Postgres pays instead in table bloat and `VACUUM`.
