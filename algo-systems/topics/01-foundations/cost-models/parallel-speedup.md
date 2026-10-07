---
id: foundations-parallel-speedup
kind: basic
version: 1
level: 2
tags: [cost-model, throughput, concurrency]
refs:
  - https://doi.org/10.1145/1465482.1465560
elaborate: Which step of your build or test pipeline still runs on one core while the rest fans out?
---

## A job is 4 equal steps of 1 s each. Steps 2 and 3 are parallelised perfectly over as many cores as you like. What is the best speedup?

---

**2×: from 4 s to 2 s, because steps 1 and 4 still take 1 s each.**

Infinite cores shrink only the parallel part, towards zero. The part
that stays serial sets a floor under the run time, however much
hardware you add.
