---
id: compiler-coalescing
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers]
requires:
  - compiler-allocation-vocabulary
refs:
  - https://dl.acm.org/doi/10.1145/177492.177575
  - https://dl.acm.org/doi/10.1145/229542.229546
elaborate: LLVM's RegisterCoalescer joins copies whose ranges do not interfere, without a degree test. What later stage lets it get away with that?
---

## Coalescing merges the two live ranges of `a = b` so the copy disappears. Why must it be conservative?

---

**The merged node inherits both neighbour sets, so its degree can reach K and force a spill.**

Briggs' test merges only if the result has fewer than K neighbours of
degree ≥ K: then simplify can still remove it. Trading a cheap copy for
a spill is a bad deal.
