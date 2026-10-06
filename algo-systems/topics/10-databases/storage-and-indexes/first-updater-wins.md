---
id: db-first-updater-wins
kind: basic
version: 1
level: 3
tags: [databases, transactions, isolation, postgres]
requires:
  - db-isolation-snapshots
refs:
  - https://www.postgresql.org/docs/current/transaction-iso.html
---

## In Postgres `REPEATABLE READ`, T1 updates a row that T2 changed and committed after T1's snapshot. What happens?

---

**The `UPDATE` fails: `could not serialize access due to concurrent
update`.** T1 may not modify a version newer than its snapshot. (Were T2
still uncommitted, T1 would first wait for it.) The application retries.

Under `READ COMMITTED`, T1 instead re-checks its `WHERE` against T2's
version and proceeds — risking a lost update.
