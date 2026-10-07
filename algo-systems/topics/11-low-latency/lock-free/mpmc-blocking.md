---
id: ll-mpmc-blocking
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, queues, concurrency, misconception]
requires:
  - ll-mpmc-slot-sequence
  - ll-progress-ladder
elaborate: Which queue on your hot path would stall if one producer thread were descheduled for 10 ms, and does it matter for your tail?
refs:
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
  - https://dl.acm.org/doi/10.1145/114005.102808
---

## Vyukov's bounded MPMC ring uses no mutex, so it is lock-free. A producer claims ticket 7, then is descheduled before writing. What do the consumers see?

---

**Every consumer sees the queue empty until that producer resumes: it is
not lock-free.** All of them are at dequeue position 7, whose sequence
cannot advance without its claimant; after a lap, every producer sees it
full. It is used because it is fast, not because it is lock-free.
