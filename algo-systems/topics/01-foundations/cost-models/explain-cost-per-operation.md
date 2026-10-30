---
id: foundations-explain-cost-per-operation
kind: explain
version: 2
level: 4
requires:
  - interview-essentials/foundations-cache-cost-model
  - interview-essentials/foundations-prefetch-scan-vs-chase
  - foundations-memory-level-parallelism
  - foundations-branch-misprediction
  - interview-essentials/complexity-amortised-single-call
tags: [complexity, cost-model, interview]
elaborate: Name a hot path you know where the structure with the better big-O would lose on cache misses per operation.
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/48529.48535
---
An interviewer asks: two candidate structures pass the big-O filter for
a hot path. What do you count, per operation, to predict which is
faster on real hardware?
---
- [ ] Cache misses per operation, not instructions: the miss is the unit of cost
- [ ] Whether those misses overlap: a pointer chase waits for each load, while a scan is prefetched
- [ ] Useful bytes per cache line: node pointers and empty slots mean fewer elements per line loaded
- [ ] Data-dependent branches: on unpredictable input each mispredicts about half the time, at ~15–20 cycles
- [ ] The worst single call, not just the amortised cost, when the budget applies per call
