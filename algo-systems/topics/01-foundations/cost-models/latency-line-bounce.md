---
id: foundations-latency-line-bounce
kind: basic
version: 1
level: 3
tags: [memory-hierarchy, cost-model, low-latency, false-sharing]
requires:
  - foundations-latency-scale
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
---

## Two cores on one socket each increment their own counter, but the two counters share a cache line. Each increment now costs about as much as what?

---

**A DRAM miss (~40–100 ns), paid on every write; more across sockets.**
Coherence lets only one core hold a line for writing, so each write
pulls the line out of the other core's cache. An uncontended atomic on a line already in L1 costs ~5–10 ns;
this is why per-core state is padded to its own line.
