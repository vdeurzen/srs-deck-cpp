---
id: compiler-sccp
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dataflow, optimisation]
requires:
  - compiler-ssa-form
  - compiler-worklist-dataflow
refs:
  - https://dl.acm.org/doi/10.1145/103135.103136
  - https://llvm.org/docs/Passes.html#sccp-sparse-conditional-constant-propagation
elaborate: Swap the constant lattice for value ranges. Which termination hypothesis breaks, and what restores it?
---

## What does sparse *conditional* constant propagation do that running constant propagation and dead-branch elimination separately cannot?

---

**Loop constants that make a branch dead, where only that dead branch keeps them constant.**

SCCP assumes edges unreachable and values unknown until proved, and a φ
meets only executable edges. Alternating the separate passes handles
acyclic cases, but each starts from "every edge runs", so a mutual
dependence through a loop φ stays ⊥.
