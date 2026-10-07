---
id: tree-explain-order-index
kind: explain
version: 1
level: 3
tags: [trees, bst, avl, red-black, capstone]
requires:
  - tree-why-balance
  - tree-avl-insert-trace
  - tree-avl-vs-red-black
refs:
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
  - https://en.cppreference.com/w/cpp/container/map
---
A gateway keeps about 10⁶ open orders in memory, keyed by order id. Most
new ids are the largest so far, but amended orders are re-inserted with
ids in the middle at a high rate. It looks orders up, cancels them, and
lists every order between two ids. A colleague proposes a plain binary
search tree. Talk through what happens and what you would use instead.
---
- [ ] Plain BST: increasing ids always go right, so the tree degenerates toward a list and lookups approach O(n)
- [ ] A sorted array would serve lookups and ranges, but every mid-range insert or cancel shifts O(n) elements; a balanced tree pays O(log n)
- [ ] A balanced tree (AVL or red-black) keeps a height or colour invariant, so its height stays O(log n): about 20–40 levels for 10⁶, not 10⁶
- [ ] The repair after each update walks one path; each rotation costs O(1) and keeps the in-order order, so the update stays O(log n)
- [ ] Range listing is an in-order walk from the lower id, O(log n + k); `std::map` (red-black, fewer rotations per update) provides exactly this
