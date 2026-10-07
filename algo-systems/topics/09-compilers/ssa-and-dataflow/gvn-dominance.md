---
id: compiler-gvn-dominance
kind: basic
version: 1
level: 5
tags: [compilers, ssa, optimisation, dominance]
requires:
  - compiler-gvn-hash-consing
  - compiler-ssa-dominance-property
refs:
  - https://llvm.org/docs/Passes.html#gvn-global-value-numbering
  - https://dl.acm.org/doi/10.1145/359060.359069
elaborate: Partial redundancy elimination would remove this pair. What would it insert, and where?
---

## GVN gives `a + b` the same number in both arms of an `if`. Why can it not replace one with the other?

---

**Neither definition dominates the other.**

A redundant value may only be replaced by an equal one that dominates
it, or the replacement would be used on a path where it was never
computed. Here both survive; hoisting one copy above the branch is a
different transformation.
