---
id: foundations-memory-level-parallelism
kind: cloze
version: 1
level: 4
tags: [memory-hierarchy, cost-model, low-latency]
requires:
  - foundations-cache-cost-model
  - foundations-littles-law
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/mlp/
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
---

Take a DRAM miss as 80 ns and a line as 64 bytes. A linked-list walk
cannot issue the next load until the current one {{c1::returns::what the
next address depends on}}, so one miss is in flight at a time: one line
per 80 ns, 0.8 GB/s. Random loads into an array are independent, so the
core overlaps them; with 10 misses in flight Little's law gives one line
every {{c2::8 ns}}, about {{c3::8 GB/s}} — same instruction count, ten
times the throughput.

---

Little's law applied to memory: throughput = misses in flight / latency.
The number in flight is capped by the core's miss-handling buffers
(algorithmica measures 13–17 concurrent DRAM reads; "about a dozen" is
the working figure), which is why batching
independent probes pays only until those buffers are full, and why a
pointer chase is latency-bound while a scan is bandwidth-bound.
