---
id: compiler-dominance-frontier
kind: basic
version: 2
level: 5
tags: [compilers, ssa, dominance]
requires:
  - compiler-dominance
  - compiler-ssa-form
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
elaborate: Control dependence is the dominance frontier of the reversed CFG. Which pass would you build on that?
---

## `B` assigns `x`. Which block is in `B`'s dominance frontier, and so needs a φ for `x`?

```
A → H → B
    ↑   │
    └───┘     H also exits to X
```

---

**`H`, the loop header.**

`DF(n)` holds the blocks `m` where `n` dominates a predecessor of `m`
but does not strictly dominate `m`. `B` dominates itself, a predecessor
of `H`, but not `H`: there the new `x` from the back edge merges with
the one from `A`.
