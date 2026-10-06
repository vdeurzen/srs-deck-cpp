---
id: compiler-range-narrowing
kind: basic
version: 1
level: 5
tags: [compilers, dataflow, lattices, abstract-interpretation]
requires:
  - compiler-range-widening
refs:
  - https://dl.acm.org/doi/10.1145/512950.512973
elaborate: Why must narrowing run only a bounded number of rounds, when widening's whole purpose was to stop iteration?
---

## Widening leaves `for (i = 0; i < 10; ++i)` with `i ∈ [0, +∞]` at the header, so after the loop `i ≥ 10` is all that is known. What recovers `i == 10`?

---

**A narrowing pass: re-evaluate the loop once more, replacing only
infinite bounds with the newly computed ones.**

From `[0, +∞]` the body yields `[1, 10]`, so the header narrows to
`[0, 10]` and the exit edge (`i ≥ 10`) to `[10, 10]`. Finite bounds are
never touched, so the result stays sound.
