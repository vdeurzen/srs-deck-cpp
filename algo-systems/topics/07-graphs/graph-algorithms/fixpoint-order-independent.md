---
id: graph-fixpoint-order-independent
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dataflow, invariants]
requires:
  - graph-reverse-postorder
  - compiler-worklist-dataflow
refs:
  - https://doi.org/10.1145/512927.512945
---

## Two runs of the same monotone dataflow analysis visit the blocks in different orders. Can they reach different results?

---

**No: the order changes how many passes it takes, not the fixpoint it reaches.**

With monotone transfer functions over a finite-height lattice, every
fair iteration converges to the same maximal fixpoint (Kildall, 1973).
Visiting order is purely a speed choice. A result that depends on order
points to a non-monotone transfer function.
