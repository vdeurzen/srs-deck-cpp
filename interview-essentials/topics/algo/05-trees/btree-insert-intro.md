---
id: tree-btree-insert-intro
kind: basic
version: 1
level: 2
tags: [trees, b-trees, foundations]
requires:
  - tree-why-balance
refs:
  - https://doi.org/10.1007/BF00288683
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §18.2
elaborate: Say in one sentence, as to an interviewer, why a disk-based index wants nodes holding hundreds of keys.
---

A B-tree is a search tree whose nodes hold several sorted keys (here at
most 2) and whose leaves all sit at the same depth.

```text
       [20]
      /    \
 [5 10]    [30 40]
```

## Inserting 12 lands in the full leaf `[5 10]`. What happens to that leaf so every node keeps at most 2 keys?

---

**It splits around its middle key, 10, which moves up into the parent.**

`[5 10 12]` becomes `[5]` and `[12]`, and the root becomes `[10 20]`.
No leaf moved deeper: a B-tree grows taller only when the root itself
splits, so every leaf stays at the same depth and a lookup O(log n).
