---
id: ordered-branchless-large-array
kind: basic
version: 1
level: 5
tags: [binary-search, branchless, memory-hierarchy, low-latency]
requires:
  - ordered-branchless-lower-bound
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
---

## The branchless (`cmov`) binary search wins clearly while the array fits in cache. Why can it *lose* to the branchy loop on an array far larger than cache?

---

**The branchy loop's speculation was prefetching the next probe; the `cmov` waits for each load.**

A predicted branch lets the CPU start the next step's load before the
comparison resolves, right half the time. The `cmov` makes every address
depend on the previous miss, so the misses fully serialise.
