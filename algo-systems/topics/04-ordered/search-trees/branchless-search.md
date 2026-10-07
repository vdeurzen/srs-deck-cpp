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
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://arxiv.org/abs/1509.05053
---
A column-store segment holds 10⁸ sorted `int32` keys (400 MB), read-only
and probed millions of times a second. The profile shows the textbook
binary search stalled. Walk through why it is slow and what you would
change, in order.
---
- [ ] Names the cost of the `a[mid] < key` branch: with random keys it mispredicts about half the time
- [ ] Says a branchless `cmov` loop removes the mispredictions but can lose at 400 MB, because the branchy loop's speculation was acting as a prefetch
- [ ] Prefetches both possible next probes, because both addresses are known before the comparison resolves, so the misses overlap
- [ ] Re-lays the keys in Eytzinger order, because the hot top levels then sit in a few cache lines that stay resident
- [ ] Accepts losing sorted order (no range scans, rebuild on change) only because this segment is static
