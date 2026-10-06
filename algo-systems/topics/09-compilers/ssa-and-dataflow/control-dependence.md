---
id: compiler-control-dependence
kind: basic
version: 1
level: 5
tags: [compilers, dominance, dead-code, optimisation]
requires:
  - compiler-dominance
  - compiler-liveness
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/Transforms/Scalar/ADCE.cpp
elaborate: In `for (i = 0; i < n; ++i) {}` the counter is used, by the loop's own branch. Why does that defeat liveness-based DCE but not this one?
---

## Aggressive DCE marks only side-effecting instructions live at first. Which conditional branches does it keep?

---

**Those a live instruction is control dependent on: branches deciding
whether it runs.**

B is control dependent on X when X has a successor B post-dominates,
while B does not strictly post-dominate X. Other branches become jumps.
So Cytron's version deletes an empty loop; LLVM's ADCE keeps loop back
edges unless `-adce-remove-loops`, since the loop might not terminate.
