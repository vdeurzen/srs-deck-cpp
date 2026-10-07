---
id: ordered-adaptive-radix-tree
kind: basic
version: 1
level: 5
requires:
  - ordered-trie-path-compression
tags: [tries, databases, memory-hierarchy]
elaborate: ART never rebalances, so its shape depends only on the key set. What does that give a concurrent or persistent index?
refs:
  - https://db.in.tum.de/~leis/papers/ART.pdf
---

## A byte-wise radix tree gives every node 256 child slots. What problem does ART solve by switching node types as children come and go?

---

**Sparse nodes waste ~2 KiB of null pointers; ART sizes each node to its occupancy.**

256 × 8-byte pointers is 2 KiB, yet nodes deep in a sparse key space have
two children. ART grows a node to the next type when it fills and
shrinks it when children leave, keeping memory near a B-tree's.
