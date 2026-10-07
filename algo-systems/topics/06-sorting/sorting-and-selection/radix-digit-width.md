---
id: sort-radix-digit-width
kind: basic
version: 1
level: 4
tags: [sorting, cache, low-latency]
requires:
  - sort-radix
  - foundations-cache-cost-model
elaborate: The same trade-off sets the fan-out of a radix-partitioned hash join — how would you pick the partition bits there?
refs:
  - https://en.algorithmica.org/hpc/algorithms/sorting/
---

## A 16-bit digit would halve radix sort's passes over 64-bit keys. Why do fast implementations still use 8-bit digits?

---

**65 536 buckets: that many scattered write streams thrash L1 and the TLB.**

Each pass scatters to every bucket at once, and the 32-bit-counter
histogram alone is 256 KB. With 8-bit digits: 256 write positions
(16 KB of lines) and a 1 KB histogram, all L1-resident. Fewer, slower
passes lose.
