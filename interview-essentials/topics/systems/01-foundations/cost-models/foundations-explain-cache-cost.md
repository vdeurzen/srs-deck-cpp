---
id: foundations-explain-cache-cost
kind: explain
version: 2
level: 3
tags: [memory-hierarchy, cost-model]
requires:
  - foundations-memory-hierarchy
  - foundations-latency-scale
  - foundations-cache-cost-model
  - foundations-prefetch-scan-vs-chase
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
elaborate: Which data structure in code you know reads memory in an order the cache cannot predict, and what would a scan-friendly layout look like?
---
A performance-minded interviewer asks why two algorithms with the same
big-O can differ tenfold in running time. Answer aloud.
---
- [ ] Big-O counts every memory read as one step, but the hardware does not charge reads equally
- [ ] Memory moves in 64-byte cache lines, so the unit of cost that matters is the cache miss
- [ ] An in-order int scan misses once per 16 reads, a shuffled one on nearly every read
- [ ] A random main-memory read is about 100 times slower than an L1 hit
- [ ] Pointer chasing pays a full miss per node, where a sequential scan gets hardware prefetching
