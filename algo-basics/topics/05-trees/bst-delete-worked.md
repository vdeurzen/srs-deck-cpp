---
id: tree-bst-delete-worked
kind: basic
version: 1
level: 2
tags: [trees, bst, worked-example]
requires:
  - interview-essentials/tree-bst-delete-cases
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
---

## Deleting 8, which has two children, from this BST: copy in its in-order successor, then remove the successor's old node.

```
      8
     / \
    4   12
       /  \
     10    14
       \
        11
```

| step | what happens |
|---|---|
| find 8 | two children: need a successor |
| right once, then left to the end | successor is 10 |
| copy 10 into 8's node | root now holds 10 |
| remove the old 10 | 11 moves up to it |

Why can the old 10 never have a left child?

---

**A left child would lie between 8 and 10, so it would be the successor.**

The walk went left until no left child was left, so the successor has
at most a right child. Removing it is the easy one-child case: 11
becomes 12's left child.
