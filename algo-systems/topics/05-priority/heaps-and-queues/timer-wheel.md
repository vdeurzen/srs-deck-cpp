---
id: heap-timer-wheel
kind: basic
version: 2
level: 5
requires:
  - heap-vocabulary
  - seq-intrusive-list
tags: [queues, timers, low-latency, networking]
elaborate: Which timeouts in a server you know almost never fire, and what does each one cost it today?
refs:
  - https://doi.org/10.1145/41457.37504
  - https://lwn.net/Articles/646950/
---

## A server holds a million pending timeouts, almost all cancelled before they fire. A timing wheel keeps them in a circular array of per-tick buckets, each an intrusive list. What do schedule and cancel cost there, against a heap?

---

**O(1) each in the wheel; O(log n) each in a heap.**

Scheduling indexes a bucket and links the node; cancelling unlinks the
node embedded in its owner, with no search. A heap charges log n twice
for timers that never fire (Varghese & Lauck, 1987).
