---
id: db-wal-and-commit
kind: basic
version: 1
level: 4
tags: [databases, durability, storage]
refs:
  - https://en.wikipedia.org/wiki/Algorithms_for_Recovery_and_Isolation_Exploiting_Semantics
  - https://www.postgresql.org/docs/current/wal-intro.html
---

## State the write-ahead logging rule, and explain why a commit costs one fsync no matter how many rows it touched.

---

**The rule** (two halves, both needed): a log record describing a
change must reach stable storage *before* the corresponding data page
does, and all of a transaction's log records must be durable before it
is reported committed. The first half makes **undo** possible after a
crash (you can always find out what to roll back); the second makes
**redo** possible (a committed transaction can be replayed onto a data
file that never got written).

Given that, the data pages themselves need not be written at commit
time at all. The commit path is: append log records to an in-memory log
buffer (sequential, cheap), flush the buffer up to this transaction's
last record, and `fsync`. One sequential write and one durability
barrier — independent of whether the transaction dirtied one page or a
thousand, and independent of where those pages are in the file.

**Group commit** is the direct consequence: if several transactions are
waiting to flush, one `fsync` durably commits all of them. Throughput
under concurrency is therefore bounded by the *device's* sync rate,
not by the transaction rate — which is why adding concurrency raises
throughput dramatically on a slow-sync device, and why a benchmark with
one client tells you almost nothing.

The rest of the machinery follows from making recovery bounded:
**checkpoints** record which transactions were active and how far the
dirty pages had been written, so recovery starts from the checkpoint
rather than the beginning of time; **ARIES** adds a log sequence number
stamped in each page (so recovery can tell whether a change is already
applied — idempotent redo), repeating history during redo before
undoing losers, and logging the undos themselves as
compensation records so that a crash *during* recovery is survivable.

Two practical notes. `fsync` failure handling is a genuine correctness
issue — a failed `fsync` may mark the pages clean, so the data is lost
and the next `fsync` returns success ("fsyncgate"); engines now panic
rather than continue. And the same log is the replication stream: a
follower applies the leader's WAL, which is why logical/physical log
format decisions constrain the replication design.
