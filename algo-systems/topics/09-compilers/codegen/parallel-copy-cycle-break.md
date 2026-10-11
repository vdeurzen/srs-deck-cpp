---
id: compiler-parallel-copy-cycle-break
kind: basic
version: 1
level: 4
tags: [compilers, ssa, codegen, registers]
requires:
  - compiler-parallel-copy
refs:
  - https://doi.org/10.1109/CGO.2009.19
elaborate: One spare register serves every cycle in a parallel copy, one after another. Why is one enough?
---

## The parallel copy `r0 ← r1, r1 ← r0` has no move that is safe to emit first. How is it sequentialised?

---

**Copy one member into a scratch register and redirect its readers there.**

Every destination in a cycle is still read, so no move passes the
safety test. `t ← r0` frees `r0`, its reader now reads `t`, and the
chain drains:
`t ← r0; r0 ← r1; r1 ← t` (Boissinot et al., CGO 2009).
