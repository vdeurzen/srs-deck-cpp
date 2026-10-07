---
id: ll-prefetching
kind: basic
version: 1
level: 4
tags: [low-latency, memory-hierarchy, optimisation]
requires:
  - foundations-latency-scale
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/prefetching/
  - https://www.agner.org/optimize/
---

## One loop sums an array; another sums a linked list with the same values. Why does the hardware prefetcher rescue only the first?

---

**It predicts sequential and strided addresses; a list's next address is
unknown until the current load returns.** Pointer chasing serialises
misses, ~80 ns each with the core idle between them. Code laid out to be
sequential gets prefetching free — most of the argument for flat
layouts.
