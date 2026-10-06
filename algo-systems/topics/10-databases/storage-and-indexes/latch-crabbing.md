---
id: db-latch-crabbing
kind: basic
version: 1
level: 4
tags: [databases, btree, concurrency, latches]
requires:
  - ordered-bplus-tree
refs:
  - https://doi.org/10.1007/BF00263762
  - https://dl.acm.org/doi/10.1145/319628.319663
elaborate: A B-link tree adds a right-sibling pointer to every node. What does that let a reader do when it lands on a node that is mid-split?
---

## A B⁺-tree insert latches the root, then latches the child it descends into. When may it release the root's latch?

---

**As soon as the child is latched and "safe": it has room, so it cannot
split.**

A split propagates upward, so below an unsafe child the parent may still
change. Releasing ancestors at each safe node holds the root for one step,
not the whole descent, which would serialise every writer there.
Latching only top-down rules out deadlock.
