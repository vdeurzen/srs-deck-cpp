---
id: tree-balance-families
kind: cloze
version: 2
level: 2
tags: [trees, complexity]
requires:
  - tree-rotation-intro
  - tree-btree-insert-intro
elaborate: "Why do databases favour B-trees over red-black trees? Say it in terms of how many nodes a lookup touches."
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://doi.org/10.1007/BF00288683
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
---

Balanced search trees keep the height O(log n) whatever the insertion
order, by repairing their shape after every insert. Binary ones repair
with {{c1::rotations::an operation on links}}; B-trees, whose nodes
hold several keys, repair by
{{c2::splitting a full node::an operation on nodes}}.

---

AVL and red-black trees are the common binary kind: each insert runs at
most a few rotations along one path. A B-tree never rotates; a node
that overflows splits and sends its middle key up, so the tree grows
only at the root.
