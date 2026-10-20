---
id: tree-insert-order-trace
kind: basic
version: 2
level: 2
tags: [trees, bst, complexity]
requires:
  - tree-bst-insert-trace
elaborate: Where does nearly sorted data show up in your own systems, such as timestamps or ids, and what does that predict for a plain BST keyed on it?
refs:
  - https://en.wikipedia.org/wiki/Binary_search_tree
---

## A plain (unbalanced) BST gets the keys 1 to 1000 in this order: 2, 1, 4, 3, 6, 5, …, 1000, 999. That is sorted order with each neighbouring pair swapped. About how many levels tall does the tree grow?

```
    2
   / \
  1   4
     / \
    3   …
```

---

**About n/2: 501 levels, nearly as bad as fully sorted input.**

Each pair's larger key goes right of the previous one, building a
500-node right spine; each smaller key hangs as a left leaf one level
lower. Nearly sorted input ruins a plain BST like sorted input does.
