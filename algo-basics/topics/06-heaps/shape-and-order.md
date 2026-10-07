---
id: heap-shape-and-order
kind: cloze
version: 1
level: 1
tags: [heaps, invariants, trees]
requires:
  - tree-complete-shape
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Binary_heap
---

```
          9              index:  0  1  2  3  4  5
        /   \            value:  9  7  8  3  5  6
       7     8
      / \   /
     3   5 6
```

A binary max-heap keeps two rules. Its shape is {{c1::complete::a shape}}:
every level is full except the last, which fills from the left. Its order:
every parent is {{c2::at least as large as its children::a comparison}},
so the maximum is at the root. Nothing orders siblings: 7 and 8 could
swap places. The shape lets the tree live in an array in level order,
with no pointers.
