---
id: ordered-order-statistics
kind: basic
version: 1
level: 4
requires:
  - ordered-why-balance
tags: [trees, databases, ranking]
elaborate: For a static array, a sorted copy plus lower_bound already gives rank in O(log n). When does the augmented tree earn its upkeep?
refs:
  - https://en.wikipedia.org/wiki/Order_statistic_tree
  - https://gcc.gnu.org/onlinedocs/libstdc++/ext/pb_ds/tree_based_containers.html
---

## What must each node of a balanced BST store so you can find the k-th smallest key in O(log n)?

---

**The size of its subtree.**

At each node, compare k with the left subtree's size L: smaller goes
left, equal is this node, larger goes right with k − L − 1. One
root-to-leaf path. The same trick works for any subtree aggregate: sum,
min, max, count.
