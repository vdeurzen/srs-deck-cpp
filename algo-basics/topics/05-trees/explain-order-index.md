---
id: tree-explain-order-index
kind: explain
version: 2
level: 3
tags: [trees, bst, capstone]
requires:
  - interview-essentials/tree-why-balance
  - tree-avl-insert-trace
  - tree-avl-vs-red-black
elaborate: Why would a sorted array of the orders lose here, although it serves lookups and range listings well?
refs:
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
  - https://en.cppreference.com/w/cpp/container/map
---
A gateway keeps about 10⁶ open orders in memory, keyed by order id. Most
new ids are the largest so far, but amended orders are re-inserted with
ids in the middle at a high rate. It looks orders up, cancels them, and
lists every order between two ids. A colleague proposes a plain binary
search tree. Explain to them what you would use instead, and why.
---
- [ ] A plain BST sends each new largest id right, so it degenerates toward a list: lookups approach O(n)
- [ ] A balanced tree, AVL or red-black, keeps its height O(log n): 20 to 40 levels for 10⁶ orders
- [ ] Inserts and cancels repair it with rotations, O(1) each and order-preserving, so every update stays O(log n)
- [ ] Listing a range descends to the lower id, then walks in order, which emits the ids sorted
- [ ] `std::map` is such a tree, red-black: a cancel needs at most 3 rotations, AVL up to one per level
