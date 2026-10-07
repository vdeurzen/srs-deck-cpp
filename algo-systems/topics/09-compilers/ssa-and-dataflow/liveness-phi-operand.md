---
id: compiler-liveness-phi-operand
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dataflow, registers]
requires:
  - compiler-liveness
  - compiler-ssa-dominance-property
refs:
  - https://doi.org/10.1145/1356058.1356064
  - https://dl.acm.org/doi/10.1145/115372.115320
elaborate: SSA liveness can be answered per value, walking back from each use to its single definition. Where does a φ operand's walk start?
---

## Block `B` begins `x3 = φ(x1 from P, x2 from Q)`. At which program point does this φ make `x1` live?

---

**At the end of `P`, on its own incoming edge, not at the top of `B`.**

Treating it as a use at the top of `B` makes `x1` live-out of every
predecessor, including `Q`, where `x1` may never be defined. The
allocator then sees false interference with `x2`, though the two could
share a register.
