---
id: ordered-avl-vs-red-black
kind: basic
version: 1
level: 3
tags: [trees]
requires:
  - ordered-balance-families
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
  - https://docs.kernel.org/scheduler/sched-design-CFS.html
---

## AVL trees are more tightly balanced than red-black trees. Why do `std::map` (libstdc++) and the Linux kernel's scheduler use red-black?

---

**Cheaper deletes: red-black needs at most three rotations; AVL may rotate at every level.**

Both fix an insert with at most two rotations. AVL's tighter invariant
(sibling heights within 1) gives slightly shallower lookups but more
rebalancing on delete. For update-heavy maps the looser invariant is the
better trade.
