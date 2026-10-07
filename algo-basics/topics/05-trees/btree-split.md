---
id: tree-btree-split
kind: cloze
version: 1
level: 2
tags: [trees, b-tree, invariants]
requires:
  - tree-btree-node
refs:
  - https://doi.org/10.1007/BF00288683
  - https://en.wikipedia.org/wiki/2%E2%80%933_tree
---

```
    [10 | 20]   + 30   ==>   [10 | 20 | 30]
                               too full
```

A 2-3 tree is a B-tree whose nodes hold at most 2 keys. Inserting 30
into the full leaf [10 | 20] overflows it, so it splits into [10] and
[30] and the middle key {{c1::20::which key}} moves up into the parent.
When the root itself splits, a new root is made above it: the tree grows
at the {{c2::top::where}}, so every leaf stays at the same depth.
