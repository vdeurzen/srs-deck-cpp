---
id: db-mvcc
kind: basic
version: 1
level: 5
tags: [databases, concurrency, transactions]
requires:
  - db-isolation-snapshots
refs:
  - https://www.vldb.org/pvldb/vol10/p781-Wu.pdf
  - https://www.postgresql.org/docs/current/mvcc-intro.html
---

## What does MVCC store per row, how is visibility decided, and what is the cost nobody mentions?

---

**Multiple physical versions of each logical row.** An update does not
overwrite; it creates a new version and links it into a **version
chain**. Each version carries the transaction that created it and the
one that deleted or superseded it (`xmin`/`xmax` in Postgres,
begin/end timestamps elsewhere).

**Visibility** is decided against a **snapshot** taken at the
transaction's (or statement's) start: the set of transactions committed
at that instant. A version is visible if its creator is in the snapshot
and its deleter is not. The result is the property that pays for all of
this: **readers never block writers and writers never block readers**,
and a read-only transaction takes no **row** locks at all — it just
walks version chains and filters (it still takes a table-level
`ACCESS SHARE` lock in Postgres, and SIREAD predicate locks under
`SERIALIZABLE`).

The costs, which are substantial and rarely stated:

- **Garbage.** Old versions must be reclaimed once no live snapshot can
  see them. That is Postgres's `VACUUM`, and it is the source of the
  classic failure mode: one long-running transaction holds back the
  oldest visible snapshot, so nothing can be reclaimed, and tables
  **bloat** — the reason a forgotten `BEGIN` in a session can slowly
  take a production database down.
- **Version chain traversal.** A hot row updated thousands of times has
  a long chain, and readers with old snapshots walk it. Engines
  mitigate with newest-to-oldest ordering, with in-place updates plus
  an undo log (MySQL/InnoDB, Oracle) rather than append-only storage,
  and with hot chain pruning.
- **Index maintenance.** If each version is a separate physical row,
  every index must point at all of them (Postgres's write amplification
  on update, partially fixed by heap-only tuples).
- **Snapshot bookkeeping** is a shared structure and a scalability
  bottleneck at high core counts.

The design axes worth remembering: append-only vs delta/undo storage,
timestamp vs transaction-id ordering, and whether writes take locks
(two-phase locking + MVCC, as in most engines) or validate at commit
(optimistic/serializable snapshot isolation). And the semantics
question that follows: snapshot isolation alone permits **write skew**,
so `SERIALIZABLE` needs something more — SSI in Postgres, or explicit
`SELECT … FOR UPDATE`.
