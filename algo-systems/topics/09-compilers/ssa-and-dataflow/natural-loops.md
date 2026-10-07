---
id: compiler-natural-loops
kind: basic
version: 1
level: 4
tags: [compilers, cfg, loops, optimisation]
requires:
  - compiler-dominance
refs:
  - https://llvm.org/docs/LoopTerminology.html
  - https://dl.acm.org/doi/10.1145/262004.262005
elaborate: Two natural loops are disjoint or nested unless they share a header. What number does that give every block, and which cost decisions use it?
---

## How does a compiler find loops in a CFG when the source language's loops have long since been compiled away?

---

**From back edges: edges `n → h` where `h` dominates `n`.**

The natural loop of that edge is the header `h` plus every block that
reaches `n` without passing through `h`, found by walking predecessors
backwards from `n`. Control returning to a block that must already have
run is what makes it a loop.
