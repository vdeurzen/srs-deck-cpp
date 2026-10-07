---
id: tree-btree-node
kind: basic
version: 1
level: 2
tags: [trees, b-tree, external-memory, complexity]
requires:
  - tree-balance-families
  - tree-min-height
refs:
  - https://doi.org/10.1007/BF00288683
  - https://doi.org/10.1145/356770.356776
---

## 10⁹ keys on disk, read one node per I/O. A B-tree node holds about 1000 children. How many reads does a lookup take, against a balanced binary tree?

```
  a small B-tree, 3 children per node:

              [ 40 | 80 ]
             /     |     \
  [10 | 25]   [50 | 65]   [90 | 95]
```

---

**3 reads instead of about 30: height is log₁₀₀₀ n, not log₂ n.**

A disk read costs the same for 16 bytes or 16 KiB, so a node fills a
page: 1000 keys and child links, searched in memory. Each level divides
the keys by 1000: 1000³ = 10⁹. A binary node only halves them:
log₂ 10⁹ ≈ 30.
