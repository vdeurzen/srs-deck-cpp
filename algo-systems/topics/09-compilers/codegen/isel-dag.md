---
id: compiler-isel-dag
kind: basic
version: 1
level: 5
tags: [compilers, codegen, dynamic-programming]
requires:
  - compiler-instruction-selection
refs:
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
  - https://dl.acm.org/doi/10.1145/69558.75700
elaborate: Splitting a DAG into trees at shared nodes makes selection linear again. What can a tile then no longer cover?
---

## Optimal tiling is linear on a tree. Why does it become NP-complete once common subexpressions make the IR a DAG?

---

**A shared node's best tile depends on all of its users at once.**

One user may want the node folded into its own tile, another wants it in
a register, so per-node choices no longer compose. Compilers split the
DAG at shared nodes or match greedily.
