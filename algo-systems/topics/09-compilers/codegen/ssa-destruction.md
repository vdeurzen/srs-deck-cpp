---
id: compiler-ssa-destruction
kind: basic
version: 2
level: 5
tags: [compilers, ssa, codegen]
requires:
  - compiler-ssa-form
refs:
  - https://doi.org/10.1002/(SICI)1097-024X(19980710)28:8%3C859::AID-SPE188%3E3.0.CO;2-8
  - https://doi.org/10.1109/CGO.2009.19
elaborate: Copy insertion lengthens live ranges and can add interference that was not there before. Which later pass is expected to clean that up?
---

## Naive φ-elimination appends `x = a` to the end of predecessor `P`. When does that copy clobber a value on a path that never reaches the φ?

---

**When `P → B` is a critical edge: the copy also runs on paths to `P`'s other successors.**

A critical edge leaves a block with several successors and enters one
with several predecessors. The fix is to split it, giving the copy its
own block on that edge alone (the lost-copy problem, Briggs et al.).
