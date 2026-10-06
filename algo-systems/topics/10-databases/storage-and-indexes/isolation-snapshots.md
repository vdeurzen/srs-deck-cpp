---
id: db-isolation-snapshots
kind: basic
version: 1
level: 3
tags: [databases, transactions, isolation, postgres]
requires:
  - db-isolation-anomalies
refs:
  - https://www.postgresql.org/docs/current/transaction-iso.html
---

## In Postgres, what separates `READ COMMITTED` from `REPEATABLE READ`?

---

**When the snapshot is taken: per statement, or once per
transaction.** Under `READ COMMITTED` each statement sees data committed
before *it* began, so two identical `SELECT`s can disagree. Under
`REPEATABLE READ` every statement sees the snapshot from the
transaction's first statement: no non-repeatable reads, and in Postgres
no phantoms either. (Postgres runs `READ UNCOMMITTED` as `READ COMMITTED`.)
