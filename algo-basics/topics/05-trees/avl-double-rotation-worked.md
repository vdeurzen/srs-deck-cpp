---
id: tree-avl-double-rotation-worked
kind: basic
version: 1
level: 2
tags: [trees, avl, rotations, worked-example]
requires:
  - tree-avl-invariant
  - tree-rotation
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Double_rotation
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §13.2 (rotations)
---

## The keys 1, 3, 2 went into a plain BST and bent into a zig-zag: node 1's right side is two levels taller than its left. The repair takes two rotations:

```
start         rotate right at 3     rotate left at 1
1             1                         2
 \             \                       / \
  3             2                     1   3
 /               \
2                 3
zig-zag       straight line         balanced
```

Why does the repair rotate at 3, the child, before rotating at 1?

---

**One left rotation at 1 would only flip the zig-zag to the other side.**

Rotating left at 1 lifts 3 and leaves 2 as 1's right child: a bend
again, still 3 levels. Rotating at 3 first straightens the bend into a
line, and a line folds into 2(1, 3) with one rotation.
