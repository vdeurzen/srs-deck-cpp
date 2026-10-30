---
id: ll-explain-hot-path-layout
kind: explain
version: 1
level: 5
tags: [low-latency, hft, layout, memory-hierarchy]
requires:
  - ll-struct-layout
  - ll-order-book-levels
  - ll-batched-probes
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.algorithmica.org/hpc/cpu-cache/mlp/
elaborate: Prices can jump far outside the array's band. Say where those levels go and what that costs on the next event.
---
An interviewer asks how you would lay out an order book's data so each
market-data event costs as few cache misses as possible. Answer aloud.
---
- [ ] A scan's cost is the cache lines it touches, so record size matters more than instruction count
- [ ] Members declared in decreasing alignment remove padding, so more records fit per line
- [ ] Price levels in an array indexed by tick give O(1) access, and neighbouring levels share lines, unlike tree nodes
- [ ] Flat, sequential layouts let the hardware prefetcher run ahead; pointer chasing serialises one miss after another
- [ ] Independent lookups are batched and prefetched together, so their misses overlap instead of queueing
