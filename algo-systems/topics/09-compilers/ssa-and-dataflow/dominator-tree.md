---
id: compiler-dominator-tree
kind: basic
version: 1
level: 4
tags: [compilers, cfg, dominance]
requires:
  - compiler-dominance
refs:
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
  - https://llvm.org/doxygen/classllvm_1_1DominatorTree.html
elaborate: With DFS in- and out-numbers on the tree, "does `d` dominate `n`?" is two integer comparisons. Which comparisons?
---

## Why can a compiler store dominance as one parent pointer per block instead of a set of dominators per block?

---

**A block's strict dominators are totally ordered, so the immediate dominator is unique.**

Each block's `idom` is its parent in a tree rooted at the entry, with
one edge per non-entry block. "Does `d` dominate `n`?" becomes "is `d`
an ancestor of `n`?".
