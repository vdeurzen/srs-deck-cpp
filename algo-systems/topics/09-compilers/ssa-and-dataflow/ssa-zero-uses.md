---
id: compiler-ssa-zero-uses
kind: basic
version: 1
level: 4
tags: [compilers, ssa, dead-code]
requires:
  - compiler-ssa-form
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://llvm.org/docs/ProgrammersManual.html#iterating-over-def-use-use-def-chains
elaborate: Deleting a dead value can leave its operands with zero uses. What does that make dead-code elimination look like as a worklist?
---

## In SSA form, how does a pass prove a side-effect-free value dead without running a dataflow analysis?

---

**It has zero uses.**

The exception is a cycle of dead φs, each used by the next, which needs
a mark-live pass instead. Every use names its single definition, so def–use chains are exact and
explicit (in LLVM a value's use list). Constant propagation, copy
propagation and dead-code elimination become walks along those edges
instead of fixpoints over the CFG.
