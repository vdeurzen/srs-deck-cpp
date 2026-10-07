---
id: tree-avl-insert-trace
kind: trace
version: 1
level: 3
tags: [trees, avl, rotations, tracing]
requires:
  - tree-avl-double-rotation
probes:
  1: { r1: "2", n1: "1" }
  2: { r2: "2", n2: "2" }
  3: { r3: "4", h3: "3", n3: "4" }
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Rebalancing
---

`avl_insert(t, k)` is a BST insert followed by the AVL repair; it adds
every rotation it makes to `t.rotations`. `root(t)` is the root's key,
`height(t)` counts levels.

```cpp
Avl a, b, c;
for (int k : {1, 2, 3}) avl_insert(a, k);
int r1 = root(a), n1 = a.rotations;                     // @1
for (int k : {3, 1, 2}) avl_insert(b, k);
int r2 = root(b), n2 = b.rotations;                     // @2
for (int k : {1, 2, 3, 4, 5, 6, 7}) avl_insert(c, k);
int r3 = root(c), h3 = height(c), n3 = c.rotations;     // @3
```

---

Both small trees end as 2(1, 3), but by different routes. (a) is a
straight line: one left rotation at 1. (b) is a zig-zag: rotate the child
to straighten it, then rotate at 3, two rotations.

Sorted input (c), the plain BST's worst case, ends as the perfect tree

        4
      /   \
     2     6
    / \   / \
   1   3 5   7

with height 3, not 7. Inserting 3, 5, 6 and 7 each needed one single
rotation; 1, 2 and 4 needed none.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
