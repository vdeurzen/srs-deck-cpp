---
id: foundations-latency-scale
kind: basic
version: 2
level: 2
tags: [memory-hierarchy, cost-model, low-latency]
elaborate: Re-measure it on the machine you ship on — NUMA, huge pages and the memory controller move these figures by a factor of two. Which of your design decisions would survive a factor of two?
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
  - https://www.agner.org/optimize/
---

## On a current x86-64 server, roughly how many times slower than an L1 hit is a random DRAM access?

---

**About 100×: ~1 ns (4 cycles) against ~80 ns, some 300 cycles.**
That is several hundred instructions of time, so a structure that spends
a few extra comparisons to save one miss wins: a B-tree node over a
red-black node, open addressing over chaining. Memorise the ratio, not
the digits.
