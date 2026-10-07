---
id: tree-bst-property
kind: basic
version: 1
level: 1
tags: [trees, bst, invariants]
requires:
  - tree-terms
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree
---

## Searching this binary search tree for 6, why may you ignore everything right of 8?

```
        8
       / \
      4   9
     / \
    2   6
```

---

**Because 6 < 8, and every key in 8's right subtree is larger than 8.**

The BST invariant: every key in a node's left subtree is smaller than the
node, every key in its right subtree is larger. It covers whole subtrees,
not just children, so one comparison rules out an entire side.
