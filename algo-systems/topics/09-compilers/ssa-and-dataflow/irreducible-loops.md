---
id: compiler-irreducible-loops
kind: basic
version: 1
level: 5
tags: [compilers, cfg, loops]
requires:
  - compiler-natural-loops
refs:
  - https://dl.acm.org/doi/10.1145/262004.262005
  - https://llvm.org/docs/LoopTerminology.html
elaborate: Node splitting makes any CFG reducible. Why is it a last resort?
---

## A `goto` jumps into the middle of a loop body from outside. Why does the loop no longer show up as a natural loop?

---

**It now has two entries, so neither entry dominates the other: the CFG is irreducible.**

The cycle has no back edge to a dominating header, so the back-edge
test never fires. Compilers find such cycles as strongly connected
components (Havlak's loop forest) or duplicate blocks until one entry
remains.
