---
id: compiler-egraphs
kind: basic
version: 2
level: 5
tags: [compilers, optimisation, rewriting]
requires:
  - compiler-phase-ordering
refs:
  - https://arxiv.org/abs/2004.03082
  - https://egraphs-good.github.io/
elaborate: Many useful transformations are not equalities (control flow, memory effects). Which kinds of optimiser therefore suit e-graphs best?
---

## Over integers that cannot overflow, an e-graph runs `a * 2 → a << 1` first. Why can `(a * 2) / 2 → a` still fire?

---

**The rewrite added `a << 1` to `a * 2`'s equivalence class instead of
replacing it.**

An e-class holds equivalent e-nodes whose children are classes, so one
graph represents many programs. Rules only add equalities, so their
order stops mattering; a cost function picks the output at the end.
