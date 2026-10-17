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

Caches and coherence move memory in lines of
{{c1::64 bytes::a power of two, on x86-64 and most AArch64}}, so two
variables in one line are one unit to every core: whichever core writes
either one takes the whole line.

---

This is the number padding is sized by (`alignas`), and the unit a scan's
cost is counted in.
