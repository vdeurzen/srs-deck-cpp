---
id: foundations-latency-scale
kind: basic
version: 1
level: 2
tags: [memory-hierarchy, cost-model, low-latency]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
  - https://www.agner.org/optimize/
---

## Put the costs a hot path meets on one scale: L1 hit, L3 hit, DRAM, branch miss, uncontended atomic, cross-core cache-line transfer, NVMe read, in-datacentre round trip.

---

Orders of magnitude on a current x86-64 server — the ratios are what you
memorise, not the digits:

| Event                                  | Rough cost      |
| -------------------------------------- | --------------- |
| L1 hit                                 | ~1 ns (4 cycles) |
| Branch misprediction                   | ~5 ns (15–20 cycles) |
| L2 hit                                 | ~4 ns           |
| Uncontended atomic RMW (line in L1)    | ~5–10 ns        |
| L3 hit                                 | ~15 ns          |
| Cache line bounced between cores       | ~40–100 ns      |
| DRAM, random access                    | ~80 ns          |
| Kernel-bypass network round trip       | ~2–5 µs         |
| NVMe random read                       | ~20–100 µs      |
| In-datacentre TCP round trip           | ~100 µs–1 ms    |

Three things follow. **A DRAM miss is ~100 instructions' worth of time**,
which is why a structure that trades a few extra comparisons for one
fewer miss — a B-tree node over a red-black node, open addressing over
chaining — wins even though it looks worse in big-O constants.
**Sharing a cache line between two writing cores costs more than the DRAM
miss it was meant to avoid**, which is what makes false sharing so
expensive and why per-core state is padded. And **the gaps are where the
design decisions live**: batching matters at the µs boundary, layout
matters at the ns boundary, and nothing you do to instruction count
matters if the access pattern is wrong.

Treat every number here as a hypothesis to re-measure on the machine you
actually ship on: core counts, NUMA, huge pages and the memory controller
move them by a factor of two or more.
