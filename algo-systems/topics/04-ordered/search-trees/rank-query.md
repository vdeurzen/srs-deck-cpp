---
id: ordered-rank-query
kind: basic
version: 1
level: 4
requires:
  - ordered-order-statistics
tags: [trees, ranking, databases]
refs:
  - https://en.wikipedia.org/wiki/Order_statistic_tree
---

## Every node stores its subtree size. How do you count the keys smaller than `x` in one descent?

---

**Search for `x`, adding left-subtree size + 1 at every step right.**

Each right step passes a node and its whole left subtree, all smaller
than `x`. At the node holding `x`, add its left subtree's size too. An
order book asks this per event: how much volume is queued ahead of this
order?
