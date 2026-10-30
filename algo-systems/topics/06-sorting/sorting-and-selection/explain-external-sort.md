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
elaborate: With 64 MB of sort memory instead of 8 GB, what changes in this plan, and what does it cost?
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
  - https://dl.acm.org/doi/10.1145/48529.48535
---
An interviewer asks: a query runs `ORDER BY country, ts` over 1 TB of
200-byte rows with 8 GB of sort memory. Walk through the plan from first
read to last write, saying where the time goes.
---
- [ ] Sort (normalised key, row id) pairs, not rows: about 12× less data through every pass
- [ ] Run generation fills memory, sorts it and writes one sorted run: one sequential read and write of everything
- [ ] Pick the largest I/O buffer whose fan-in, memory ÷ buffer − 1, still merges all runs in one pass
- [ ] Merge through a heap of run heads, refilling from the minimum's run: O(log k) comparisons per record
- [ ] The inline key prefix decides most of those comparisons without a cache miss on the row
