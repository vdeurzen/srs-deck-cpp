---
id: foundations-latency-scale
kind: basic
version: 2
level: 2
tags: [memory-hierarchy, cost-model, low-latency]
requires:
  - foundations-memory-hierarchy
elaborate: Say in one sentence, as to an interviewer, which design choice of yours would change if a cache miss cost a hundred cache hits.
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
  - https://www.agner.org/optimize/
---

## L1 is the smallest, fastest cache, beside each core. On a current server CPU, to the nearest power of ten, how many times slower than an L1 hit is a random read from main memory (DRAM)?

---

**~100× (two orders of magnitude): ~1 ns (4 cycles) against ~80 ns.**
That is several hundred instructions of time, so a structure that spends
a few extra comparisons to save one miss beats a pointer-chasing
structure that misses at every node. Memorise the ratio, not the digits.
