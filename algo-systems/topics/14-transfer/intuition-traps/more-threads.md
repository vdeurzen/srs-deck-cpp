---
id: trap-more-threads
kind: basic
version: 1
level: 4
tags: [transfer, misconception, concurrency, throughput]
elaborate: In a system you know, what is the one shared mutable thing every thread touches? What would partitioning it look like?
requires:
  - ll-amdahl-speedup
  - ll-shared-counter-scaling
refs:
  - https://en.wikipedia.org/wiki/Amdahl%27s_law
  - https://en.wikipedia.org/wiki/Universal_Scalability_Law
---

## True or false: if a workload is CPU-bound and parallelisable, doubling the threads roughly doubles the throughput.

---

**Only until something is shared**, and something always is.

**Amdahl** gives the ceiling: with a serial fraction `s`, speed-up is
capped at `1/s` — 5 % serial means 20×, however many cores you buy.
The serial part is rarely obvious in the source; it is the allocator,
a logging mutex, a shared counter, the work queue everyone pops from.

**The Universal Scalability Law** adds the term that makes real
systems get *worse*: beyond contention (α, the Amdahl part) there is
**coherence** (β) — the cost of keeping shared state consistent, which
grows with the **square** of the number of participants. That is why
throughput curves peak and then decline: at some thread count, the
cache-line traffic from synchronising costs more than the added
compute contributes.

The concrete culprits, in the order you will meet them:

1. **A contended cache line.** Even a lock-free counter is a serial
   resource — one line, one writer at a time, ~100 ns per handoff.
   False sharing produces the same curve with no visible sharing at
   all.
2. **A shared allocator or GC.** Per-thread caches hide it until they
   miss.
3. **Lock convoys and priority inversion**, where a descheduled holder
   stalls everyone.
4. **Memory bandwidth and NUMA** — the cores are idle waiting for
   DRAM, and adding more makes it worse.
5. **Hyperthread siblings** competing for one core's execution units.

The fix is almost never "a faster lock". It is **partitioning**:
per-core counters summed on read, sharded maps, per-thread arenas,
work-stealing deques with local pushes and pops, and single-writer
data structures (SPSC queues, seqlocks) that make sharing
unidirectional. Design for the shared state to be *absent*, and the
scaling follows.

The measurement that settles it: plot throughput against thread count
and look for the peak. A system that scales to 8 and degrades at 16
has a coherence problem, not a capacity problem.
