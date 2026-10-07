---
id: ordered-bplus-tree
kind: basic
version: 1
level: 4
requires:
  - ordered-rbtree-vs-btree
tags: [trees, databases, storage]
refs:
  - https://dl.acm.org/doi/10.1145/356770.356776
  - https://15445.courses.cs.cmu.edu/
---

## What does a B⁺-tree change relative to a B-tree?

---

**All values live in the leaves; internal nodes hold only separator keys.**

A B-tree may store a record beside any key at any level. A B⁺-tree
routes through internal nodes and stops only at a leaf, so every lookup
has the same depth, and leaves can be chained left to right.
