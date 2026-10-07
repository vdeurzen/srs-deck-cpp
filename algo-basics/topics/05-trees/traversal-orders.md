---
id: tree-traversal-orders
kind: cloze
version: 1
level: 1
tags: [trees, traversal, recursion]
requires:
  - tree-terms
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search
---

The three depth-first traversals visit both subtrees, left before right,
and differ only in when they visit the node itself:
preorder visits it {{c1::before::a position in time}} its subtrees,
inorder {{c2::between the left and the right subtree::a position in time}},
and postorder after both.

```
    7
   / \
  3   9
```

Postorder visits this tree as 3 9 7.
