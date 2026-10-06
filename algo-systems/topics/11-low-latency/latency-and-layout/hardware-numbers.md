---
id: ll-hardware-numbers
kind: cloze
version: 1
level: 3
tags: [low-latency, memory-hierarchy, cost-model]
requires:
  - foundations-latency-scale
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
---

The numbers a hot-path design is argued from. Memory moves in lines of
{{c1::64 bytes::on x86-64 and most AArch64 parts}}, an L1 hit costs
about 1 ns, a random DRAM access about {{c2::80 ns::roughly 80× an L1
hit, which is the whole argument for locality}}, and a branch
misprediction about 15–20 cycles.

Two cores writing different variables in the same line pay a coherence
miss of {{c3::40-100 ns::false sharing — a DRAM-class cost, paid on
every write to the line}} — which is why per-core state is padded to a line
and why one `alignas` can change a scaling curve. Virtual addresses
are translated through a TLB covering only a few megabytes at 4 KiB
pages, so a large random-access structure spends real time in
{{c4::page walks::up to four dependent memory accesses each}} until
huge pages are enabled.

At the next scale up: a kernel-bypass network round trip is a few
microseconds, an NVMe read tens of microseconds, and a context switch
or a scheduler wake-up {{c5::1-5 µs::the reason a latency-critical
thread spins instead of blocking}}.

Treat every figure as a hypothesis to re-measure on the machine you
ship on — core count, NUMA topology, huge pages and the memory
controller move them by a factor of two — but keep the *ratios*, since
those are what decide the design.
