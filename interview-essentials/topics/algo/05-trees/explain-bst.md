---
id: tree-explain-bst
kind: explain
version: 2
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
Explain binary search trees to a colleague who has only used arrays.
Answer aloud in about a minute.
---
- [ ] A BST finds a key among n ordered keys without comparing it against every one
- [ ] Every key in a node's left subtree is smaller than the node's key, every key in its right subtree larger
- [ ] One comparison picks a side: a key smaller than the node's never visits the right subtree
- [ ] A lookup costs the tree's height, about log₂ n when the tree is balanced
- [ ] Sorted inserts build a chain with O(n) lookups; self-balancing trees such as red-black trees prevent that
