---
id: compiler-linear-scan-holes
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, jit]
requires:
  - compiler-linear-scan
refs:
  - https://dl.acm.org/doi/10.1145/1064979.1064998
  - https://dl.acm.org/doi/10.1145/1772954.1772979
elaborate: Linear scan's result depends on the order the blocks were laid out in. Why does a colouring allocator not have that dependence?
---

## Linear scan models each value as one interval, `[first def, last use]`. What does that representation lose?

---

**Lifetime holes: stretches inside the interval where the value is dead.**

A value used on only one side of a branch is treated as live through
the other, inflating pressure and causing spills. Wimmer and Mössenböck
(HotSpot's client compiler) keep holes and split intervals; Wimmer and
Franz extended that to SSA form.
