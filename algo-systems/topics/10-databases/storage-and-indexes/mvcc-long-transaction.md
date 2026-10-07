---
id: db-mvcc-long-transaction
kind: basic
version: 1
level: 4
tags: [databases, transactions, postgres]
requires:
  - db-mvcc-visibility
refs:
  - https://www.postgresql.org/docs/current/routine-vacuuming.html
  - https://www.postgresql.org/docs/current/runtime-config-client.html
elaborate: Which setting would have ended this session for you, and what would its client see?
---

## A session ran `BEGIN ISOLATION LEVEL REPEATABLE READ; SELECT 1;` and has sat idle for a day. Why are busy Postgres tables bloating?

---

**Its snapshot is the oldest still open, so VACUUM may not remove any version it could see.**

A dead version is reclaimable only once no live snapshot can see it. One
idle snapshot holds that horizon back for every table in the database,
so every update's old version stays. `idle_in_transaction_session_timeout`
guards against it.
