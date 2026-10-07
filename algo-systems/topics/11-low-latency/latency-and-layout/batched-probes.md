---
id: ll-batched-probes
kind: basic
version: 1
level: 5
tags: [low-latency, memory-hierarchy, hashing, optimisation]
requires:
  - ll-prefetching
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/mlp/
  - https://en.algorithmica.org/hpc/cpu-cache/prefetching/
---

## A large hash table answers lookups one at a time, each a cache miss. Processing them 8 at a time, prefetching all 8 buckets before reading any, is often 3–4× faster. Why?

---

**More misses are in flight at once.** Out-of-order execution already
overlaps independent lookups, but only those within its reorder window;
when each lookup's work is long, the next one's miss starts late.
Prefetching the whole batch first issues all 8 misses up front, up to the
~10 line fills a core sustains.
