---
id: tree-bst-inorder-worked
kind: basic
version: 2
level: 1
tags: [foundations, trees, bst, traversal, worked-example]
requires:
  - tree-bst-rule
  - tree-traversal-orders
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR
  - https://doi.org/10.1145/321105.321108
---

## An in-order walk (left subtree, then the node, then the right subtree) of this BST, one call `in(k)` per node:

```
      5
     / \
    2   8
     \
      3
```

| call | does | emitted so far |
|---|---|---|
| in(5) | go left first: in(2) | — |
| in(2) | left empty: emit 2, go right | 2 |
| in(3) | no children: emit 3, return | 2 3 |
| in(5) | left subtree done: emit 5 | 2 3 5 |
| in(8) | no children: emit 8 | 2 3 5 8 |

Why is 3 emitted before 5, although in(5) started first?

---

**3 is in 5's left subtree, which must finish before 5 is emitted.**

in(5) waits while in(2) handles 2's whole subtree, 3 included. A BST
puts exactly the smaller keys on the left, so each subtree comes out
sorted and the whole walk reads 2 3 5 8.
