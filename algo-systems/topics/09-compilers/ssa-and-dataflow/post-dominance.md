---
id: compiler-post-dominance
kind: basic
version: 1
level: 4
tags: [compilers, cfg, dominance]
requires:
  - compiler-dominance
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://llvm.org/doxygen/classllvm_1_1PostDominatorTree.html
elaborate: A function has two `return` blocks. What must you add before a post-dominator tree has a single root?
---

## Block `B` post-dominates block `A`. What does that guarantee about an execution that reaches `A`?

---

**It passes through `B` before leaving the function.**

Post-dominance is dominance computed on the reversed CFG, rooted at the
exit. It is what control dependence, and so aggressive dead-code
elimination and if-conversion, is built from.
