---
id: compiler-dominance
kind: basic
version: 2
level: 4
tags: [compilers, cfg, dominance]
requires:
  - graph-bfs-and-dfs
refs:
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
  - https://dl.acm.org/doi/10.1145/357062.357071
elaborate: Replace the edge `A → C` with `B → C`. Which block is `D`'s immediate dominator now?
---

## In this CFG, which blocks dominate `D`?

```
     A
    / \
   B   C
    \ /
     D
```

---

**`A` and `D` itself.**

`d` dominates `n` when every path from the entry to `n` passes through
`d`; every block dominates itself. `B` does not, because `A → C → D`
avoids it. The closest strict dominator, `A`, is `D`'s immediate
dominator.
