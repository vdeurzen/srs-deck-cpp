---
id: compiler-dataflow-distributive
kind: basic
version: 1
level: 5
tags: [compilers, dataflow, lattices]
requires:
  - compiler-worklist-dataflow
refs:
  - https://dl.acm.org/doi/10.1145/512927.512945
  - https://dl.acm.org/doi/10.1145/512950.512973
elaborate: Liveness never loses precision this way. Which of its operations distribute over union?
---

## Constant propagation meets two paths before `z = x + y`. Which property of its transfer function fails, so the result is less precise than meet-over-all-paths?

```
path 1: x = 1, y = 2      path 2: x = 2, y = 1
join:   z = x + y         // 3 on both paths
```

---

**Distributivity: `f(a ⊓ b) = f(a) ⊓ f(b)` does not hold.**

Each path alone gives `z = 3`. Meeting first gives `x = ⊥, y = ⊥`, so
`z = ⊥`. Without distributivity the iterative (MFP) solution is only a
safe approximation of the meet-over-all-paths answer.
