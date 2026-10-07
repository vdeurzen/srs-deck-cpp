---
id: foundations-amdahl
kind: basic
version: 1
level: 3
tags: [cost-model, throughput, concurrency]
elaborate: What is the serial fraction in your most-threaded service — a lock, the allocator, a shared counter?
requires:
  - foundations-parallel-speedup
refs:
  - https://doi.org/10.1145/1465482.1465560
  - https://en.wikipedia.org/wiki/Amdahl%27s_law
---

## 5 % of a batch job runs under one global lock. What is the most any number of cores can speed it up?

---

**20×: the serial fraction `s` caps speedup at `1/s`.**
The serial part is usually a shared mutable structure — a global lock,
the allocator, one hot counter — so the fix that scales is partitioning
the data, not adding threads.
