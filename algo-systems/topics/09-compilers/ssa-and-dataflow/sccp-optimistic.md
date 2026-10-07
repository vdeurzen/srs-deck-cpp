---
id: compiler-sccp-optimistic
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dataflow, optimisation]
requires:
  - compiler-sccp
refs:
  - https://dl.acm.org/doi/10.1145/103135.103136
elaborate: Each SSA value can only move ⊤ → constant → ⊥. What does that bound, and why does sparseness matter on top of it?
---

## SCCP starts every value at ⊤ ("no information yet"), not ⊥. Which constants does that let it prove?

```
x0 = 1
loop:  x1 = φ(x0, x2)
       x2 = x1 * 1
       if (...) goto loop
```

---

**Loop values whose φ depends on their own back edge, like `x1 = 1` here.**

The back edge's `x2` is still ⊤ when the header is first evaluated, so
the φ is `1`; the body then confirms `x2 = 1`. A pessimistic analysis
starts the back edge at ⊥ and can never recover.
