---
id: compiler-linear-scan
kind: basic
version: 2
level: 5
tags: [compilers, codegen, registers, jit]
requires:
  - compiler-graph-colouring
refs:
  - https://dl.acm.org/doi/10.1145/330249.330250
  - https://en.wikipedia.org/wiki/Register_allocation#Linear_scan
elaborate: A baseline JIT does no allocation, a mid tier does linear scan, an AOT compiler colours or splits greedily. What decides which one a tier gets?
---

## Why do JITs allocate registers by linear scan rather than graph colouring?

---

**In a JIT, compile time is run time, and linear scan is one cheap pass.**

It sorts live intervals by start and walks them once, keeping a list of
active ones: no interference graph, no iteration. Poletto and Sarkar
measured it several times faster than a fast colouring allocator, for
code at most about 10 % slower.
