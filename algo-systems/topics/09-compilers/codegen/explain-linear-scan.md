---
id: compiler-explain-linear-scan
kind: explain
version: 1
level: 5
tags: [compilers, codegen, registers, jit, interview]
requires:
  - compiler-linear-scan-holes
  - compiler-linear-scan-spill
  - compiler-ssa-chordal
refs:
  - https://dl.acm.org/doi/10.1145/330249.330250
  - https://dl.acm.org/doi/10.1145/1772954.1772979
---
Explain how a JIT's linear-scan allocator works, what it trades away
against graph colouring, and how later designs won some of it back.
---
- [ ] A JIT pays compile time at run time, so it avoids building an interference graph: linear scan walks live intervals once, sorted by start
- [ ] It keeps an active list, expiring intervals that ended before the current start, and gives the current interval any free register
- [ ] With no register free it spills the interval ending furthest away, possibly the current one: Belady's rule
- [ ] One interval per value treats lifetime holes as live, inflating pressure; HotSpot's client compiler keeps holes and splits intervals instead (Wimmer and Mössenböck)
- [ ] On SSA form the interference graph is chordal, and Wimmer and Franz's linear scan keeps φs through allocation, resolving them afterwards
