---
id: ordered-skip-list
kind: basic
version: 1
level: 4
requires:
  - algo-basics/tree-balance-families
tags: [trees, randomised]
elaborate: Smaller p means fewer levels but more steps per level. Where would you tune it, and what would you measure?
refs:
  - https://dl.acm.org/doi/10.1145/78973.78977
---

## How does a skip list get expected O(log n) search without any rebalancing?

---

**Each node is promoted to the next level with probability p (½ or ¼).**

Level k then holds about pᵏ·n nodes, so there are log₁/ₚ n levels.
Search moves right while the next key is smaller, else drops a level:
expected O(1) steps per level, O(log n) in all.
