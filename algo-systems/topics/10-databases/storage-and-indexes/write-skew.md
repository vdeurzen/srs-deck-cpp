---
id: db-write-skew
kind: basic
version: 1
level: 4
tags: [databases, transactions, isolation, misconception]
requires:
  - db-first-updater-wins
elaborate: Which invariant in a schema you know spans more than one row? Which transaction checks it, and which rows does it write?
refs:
  - https://vldb.org/pvldb/vol5/p1850_danrkports_vldbsi.pdf
  - https://www.postgresql.org/docs/current/transaction-iso.html
---

## Snapshot isolation aborts one of two transactions that update the same row. Does that make every concurrent schedule serializable?

---

```sql
-- invariant: at least one doctor on call. Alice and Bob both are.
-- T1 and T2 run concurrently, each in its own snapshot:
SELECT count(*) FROM doctors WHERE on_call;            -- both see 2
UPDATE doctors SET on_call = false WHERE name = 'alice'; -- T1
UPDATE doctors SET on_call = false WHERE name = 'bob';   -- T2
-- both COMMIT: different rows, no conflict, 0 on call
```

**No: write skew.** Each transaction checked the invariant in its
snapshot and wrote only *its own* row; disjoint writes never conflict.

The invariant spans rows. Postgres `SERIALIZABLE`
(SSI) detects such dangerous read–write dependencies and aborts one;
`REPEATABLE READ` does not.
