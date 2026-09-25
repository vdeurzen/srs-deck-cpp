---
id: foundations-explain-choosing-a-structure
kind: explain
version: 1
level: 4
tags: [complexity, cost-model, interview]
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/48529.48535
---
An interviewer gives you two candidate data structures for a hot path and
asks which will be faster in production. Walk through how you would
decide — before writing either one.
---
- [ ] Start from the workload, not the structure: read/write mix, operation frequencies, key distribution, and how big `n` actually gets
- [ ] Ask which operations are on the critical path and which are background — a structure can be slow at something nobody does often
- [ ] Asymptotics first, as a filter only: rule out anything quadratic at the real `n`, then stop treating big-O as the answer
- [ ] Count cache misses per operation, not instructions: bytes touched, pointer hops, and whether access is sequential or random
- [ ] Ask what the allocation behaviour is — per-element nodes vs one block, and whether the hot path allocates at all
- [ ] Distinguish amortised from worst case, and say which one the latency requirement is written against (p99.9 cares about the reallocation, not the average)
- [ ] Check the concurrency story: what is shared, what is written by more than one core, and whether the structure forces a lock on the common case
- [ ] Consider the whole hierarchy: if the data does not fit in cache or in memory, switch to the external-memory model and count block transfers
- [ ] Name the secondary costs: reference and iterator stability, memory overhead per element, and how the structure behaves as it grows
- [ ] Finish with the measurement plan — representative data, the metric that matters (throughput vs p99), and a baseline of the simplest thing that could work (usually a sorted `vector`)
