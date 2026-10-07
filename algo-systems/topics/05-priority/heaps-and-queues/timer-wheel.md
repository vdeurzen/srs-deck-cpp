---
id: heap-timer-wheel
kind: basic
version: 1
level: 5
requires:
  - heap-vocabulary
  - seq-intrusive-list
tags: [queues, timers, low-latency, networking]
refs:
  - https://doi.org/10.1145/41457.37504
  - https://lwn.net/Articles/646950/
---

## A server holds a million pending timeouts, almost all of which get cancelled. What should hold them instead of a heap?

---

**A timing wheel: a circular array of per-tick buckets, each an intrusive list.**

A heap charges O(log n) to schedule and again to cancel, for timers
that never fire. The wheel schedules by indexing a bucket and
linking — O(1) — and cancels by unlinking the node embedded in its
owner, O(1) with no search (Varghese & Lauck, 1987).
