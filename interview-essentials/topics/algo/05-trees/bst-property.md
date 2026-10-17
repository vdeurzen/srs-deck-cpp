---
id: tree-bst-property
kind: basic
version: 1
level: 1
tags: [trees, bst, invariants]
requires:
  - tree-bst-rule
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree
---

## Searching this binary search tree for 3, why may you skip 12, 9 and 15 without looking at any of them?

```
          8
        /   \
       4     12
      / \   /  \
     2   6 9    15
```

---

**Because 3 < 8, and every key in 8's right subtree is larger than 8.**

The BST invariant: every key in a node's left subtree is smaller than the
node, every key in its right subtree is larger. It covers whole subtrees,
not just children, so one comparison rules out an entire side.
