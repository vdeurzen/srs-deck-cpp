---
id: tree-explain-bst
kind: explain
version: 1
level: 3
tags: [trees, bst, invariants]
requires:
  - tree-bst-property
  - tree-why-balance
  - tree-balance-families
  - tree-bst-check-bounds
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree
elaborate: Say in one sentence, as to an interviewer, which input arriving at your own system would quietly turn an unbalanced search tree into a list.
---
A colleague asks you how a binary search tree finds a key without
looking at every node, and what can go wrong with one. Answer aloud in
about a minute.
---
- [ ] Problem: find a key among n ordered keys without scanning every one
- [ ] Mechanism: every key in a node's left subtree is smaller, every key in its right subtree larger
- [ ] Example: searching for 3 from root 8 skips 8's whole right subtree with one comparison
- [ ] Cost: a lookup costs the tree's height, about log₂ n if balanced but n after sorted inserts
- [ ] Pitfall: checking each node only against its children accepts bad trees, because every ancestor bounds a key
