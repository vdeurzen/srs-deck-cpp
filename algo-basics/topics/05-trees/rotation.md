---
id: tree-rotation
kind: cloze
version: 1
level: 2
tags: [trees, rotations, invariants]
requires:
  - tree-balance-families
  - tree-traversal-trace
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://en.wikipedia.org/wiki/Tree_rotation
---

```
        y                x
       / \              / \
      x   C    ==>     A   y
     / \
    A   B
```

A right rotation at y lifts its left child x into y's place. Subtree B
moves from x's right to {{c1::y's left::a new parent and side}}.
Afterwards an in-order walk still reads A x B y C, so the rotation keeps
the {{c2::BST ordering::what an in-order walk would check}} while A rises
a level and C sinks one. In a tree of n nodes one rotation costs
{{c3::O(1)::a complexity}}.
