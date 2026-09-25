---
id: ll-explain-hot-path
kind: explain
version: 1
level: 5
tags: [low-latency, hft, interview]
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/2408776.2408794
---
A market-data-to-order hot path must answer in single-digit
microseconds, p99.9. Explain how you would design and verify it —
structures, memory, threading, OS, and measurement.
---
- [ ] State the requirement as a distribution, not an average: a p99.9 budget is a statement about single operations, so anything merely amortised (a growing vector, a rehashing table, a GC) is out
- [ ] No allocation on the path: pre-allocated pools and arenas, fixed-capacity containers, pre-faulted and `mlock`ed memory
- [ ] Data structures chosen for one or two cache misses per event — flat arrays and open addressing over node-based trees and chaining, handles over pointers
- [ ] Layout: hot fields together, cold fields elsewhere, per-core state padded to cache lines to avoid false sharing, SoA where a pass touches one field of many records
- [ ] Threading: single writer per data item wherever possible (SPSC rings, seqlocks), so the fast path needs no CAS and no lock; bounded queues for back-pressure
- [ ] Publication via release/acquire pairs, with each relaxed access justified; no data races, checked with a sanitiser
- [ ] OS and hardware: pinned threads on isolated cores, IRQs steered away, NUMA-local memory and NIC, huge pages, C-states and frequency scaling fixed, kernel bypass or busy-polled I/O
- [ ] Keep the path warm — periodic dummy traffic so caches, the TLB and the branch predictor are not cold when the event that matters arrives
- [ ] Branches: predictable ones left alone, unpredictable ones made branchless; the rare/slow path moved out of line so it does not pollute the instruction cache
- [ ] Measure with a histogram (and coordinated-omission-corrected load), report p99.9 and max, and profile with hardware counters — cache misses, TLB misses, branch misses — not just wall clock
- [ ] Know the failure modes you have accepted: a bounded queue overflowing, a pool exhausted, a warm-up window after deployment — and make each one loud rather than silent
- [ ] Say what you would *not* do: no clever lock-free structure without a measured contention problem, no micro-optimisation before the layout and the allocation story are right
