---
id: compiler-iterated-frontier
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dominance]
requires:
  - compiler-dominance-frontier
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://llvm.org/doxygen/classllvm_1_1IDFCalculatorBase.html
elaborate: On a very irregular CFG the frontiers can grow quadratically. What would you compute instead of materialising them?
---

## φs for `x` go in the dominance frontiers of the blocks that assign `x`. Why must that set be *iterated*?

---

**A new φ is itself a definition of `x`, which may need φs in its own frontier.**

Repeat until no block is added: the fixpoint `DF⁺(S)` over the
defining blocks `S` is the placement for *minimal* SSA, with no φ the
merge criterion does not demand.
