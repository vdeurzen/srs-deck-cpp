---
id: compiler-graph-colouring
kind: basic
version: 2
level: 5
tags: [compilers, codegen, registers, graphs]
requires:
  - compiler-allocation-vocabulary
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://dl.acm.org/doi/10.1145/177492.177575
elaborate: Spilling a node often turns out to be unnecessary because two of its neighbours got the same colour. Draw the smallest graph where that happens.
---

## In a Chaitin–Briggs allocator, simplify gets stuck and pushes a high-degree node anyway. Which phase decides whether it is actually spilled?

---

**Select: it spills only if no colour is free when the node is popped.**

That is Briggs' optimistic colouring. Chaitin spilled at the moment
simplify got stuck, but a node's neighbours often share colours. Spill
code is then inserted and the whole build–simplify–select cycle reruns.
