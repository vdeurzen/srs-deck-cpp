---
id: ll-hardware-numbers
kind: cloze
version: 2
level: 3
tags: [low-latency, memory-hierarchy, cost-model]
requires:
  - foundations-latency-scale
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
---

Two cores each write their own 8-byte counter, and the counters sit
side by side in memory. On x86-64 each write makes its core take
exclusive ownership of the whole
{{c1::64-byte cache line::a unit, with its size}}, so the two writes
contend as if they were one variable.

---

Coherence tracks lines, not variables: the line holding both counters
moves between the cores on every write. 64 bytes is the line on x86-64
and most AArch64 (Apple M-series: 128); it is what padding with
`alignas` is sized by, and the unit a scan's cost is counted in.
