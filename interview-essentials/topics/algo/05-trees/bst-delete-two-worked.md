---
id: tree-bst-delete-two-worked
kind: basic
version: 1
level: 2
tags: [trees, bst, worked-example]
requires:
  - tree-bst-delete-one-child
  - tree-traversal-orders
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
---

## Deleting 40, which has two children, from this BST. It is replaced by its *in-order successor*, the next larger key.

```
    40
   /  \
 20    60
      /
    50
      \
       55
```

| step | does | tree after |
|---|---|---|
| 1 find successor | right to 60, then left to 50 | unchanged |
| 2 copy up | write 50 into the root | root 50, old 50 below |
| 3 remove successor | 60's left link now → 55 | 50: 20, 60; 60: 55 |

Why does step 3 need only the one-child case, never the two-children
case again?

---

**The successor is the leftmost node of the right subtree, so it has no left child.**

Step 1 goes left until it can't, so the node it stops at lacks a left
child. Removing it is then the leaf or one-child case: here 55 moves up.
