---
id: compiler-tree-tiling
kind: basic
version: 1
level: 3
tags: [compilers, codegen, tiling]
requires:
  - compiler-backend-phases
refs:
  - https://dl.acm.org/doi/10.1145/69558.75700
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
---

## Instruction selection covers an expression tree with tiles, one per machine instruction. When is a cover valid?

---

```
    +              lea r, [a + b*4]     one tile, three nodes
   / \
  a   *            add r, a             two tiles: add + shl
     / \           shl b, 2
    b   4
```

**Every node is covered by exactly one tile, and tiles meet only at
values held in registers.** A tile's leaves are IR leaves or the roots of
other tiles. Both covers above are valid; choosing the cheapest is the
optimisation problem.
