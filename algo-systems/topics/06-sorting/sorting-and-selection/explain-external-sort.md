---
id: sort-explain-external
kind: explain
version: 1
level: 5
tags: [sorting, databases, external-memory]
requires:
  - sort-external-fan-in
  - heap-k-way-merge
  - sort-key-prefix
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
  - https://dl.acm.org/doi/10.1145/48529.48535
---
A query runs `ORDER BY country, ts` over 1 TB of 200-byte rows, with
8 GB of sort memory. Walk through the plan from first read to last
write, and say where the time goes at each step.
---
- [ ] Sorts (normalised key, row id) pairs instead of rows, so about 12× less data goes through every pass
- [ ] Run generation fills memory, sorts it and writes one sorted run sequentially, so the first pass reads and writes everything once
- [ ] Picks the largest I/O buffer whose fan-in (memory ÷ buffer − 1) still merges every run in a single pass
- [ ] Merges through a heap over the run heads, refilling from the run the minimum came from: O(log k) comparisons per output record
- [ ] Most of those comparisons are decided by the inline key prefix, so they never take a cache miss on the row
