---
id: ordered-branchless-search
kind: explain
version: 2
level: 5
requires:
  - ordered-branchless-prefetch
  - ordered-eytzinger-decode
  - ordered-eytzinger-cost
tags: [binary-search, branchless, memory-hierarchy, low-latency]
elaborate: Many independent lookups arrive at once. How would you overlap their misses too?
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://arxiv.org/abs/1509.05053
---
An interviewer asks: a column-store segment holds 10⁸ sorted `int32`
keys (400 MB), read-only and probed millions of times a second, and the
profile shows the textbook binary search stalled. Why is it slow, and
what would you change, in order?
---
- [ ] The `a[mid] < key` branch mispredicts about half the time on random keys
- [ ] A branchless `cmov` loop removes that, but can lose at 400 MB: speculation had been prefetching the next probe
- [ ] Prefetch both possible next probes, since both addresses are known before the comparison resolves
- [ ] Re-lay the keys in Eytzinger order, so the hot top levels share a few resident cache lines
- [ ] Losing sorted order (no range scans, rebuild on change) is acceptable only because the segment is static
