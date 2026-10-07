---
id: heap-timer-wheel-hierarchy
kind: basic
version: 1
level: 5
requires:
  - heap-timer-wheel
tags: [queues, timers, low-latency]
refs:
  - https://doi.org/10.1145/41457.37504
---

## A timing wheel has 256 one-millisecond buckets. How does a hierarchical wheel hold a 10-minute timeout without more buckets per wheel?

---

**Stack coarser wheels; file a timer in the finest wheel whose span covers it.**

Each wheel ticks once per turn of the finer one. A
10-minute timer lands in a coarse wheel; when its bucket comes due, it
cascades into the finer wheel. Insert and cancel stay O(1), and each timer
cascades at most once per level.
