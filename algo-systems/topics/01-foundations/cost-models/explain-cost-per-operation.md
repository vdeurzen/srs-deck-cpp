---
id: foundations-explain-cost-per-operation
kind: explain
version: 1
level: 4
requires:
  - foundations-cache-cost-model
  - foundations-amortised-single-call
  - cpp-core/containers-reference-invalidated-by-growth
tags: [complexity, cost-model, interview]
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/48529.48535
---
Two candidate structures pass the big-O filter for a hot path. What do
you count, per operation, to predict which is faster on real hardware?
---
- [ ] Cache misses per operation, not instructions: the miss is the unit of cost
- [ ] Access pattern: a sequential scan is prefetched, while each pointer hop is a dependent miss that cannot overlap the next
- [ ] Bytes per element, including node pointers or empty slots, decide how many elements share a line and whether the working set fits in cache
- [ ] Amortised versus worst case, and which one the latency requirement is written against (a p99.9 budget sees the reallocation)
- [ ] Reference stability: whether growth or a rehash moves elements that other code still points at
