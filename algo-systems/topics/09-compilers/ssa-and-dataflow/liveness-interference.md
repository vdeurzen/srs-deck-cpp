---
id: compiler-liveness-interference
kind: basic
version: 1
level: 4
tags: [compilers, dataflow, registers]
requires:
  - compiler-liveness
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://llvm.org/docs/CodeGenerator.html#register-allocator
elaborate: In `b = a + 1`, where `a` dies, `a` and `b` do not interfere. Which register does that let `b` take?
---

## A register allocator builds its interference graph from liveness. When do two values interfere?

---

**When one is live at the other's definition.**

Then both hold needed values at the same moment, so they cannot share a
register. Liveness also sets each live range's length, which drives
spill choice: a value live across a whole loop is costly to keep and
costly to spill.
