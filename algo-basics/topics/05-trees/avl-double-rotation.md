---
id: tree-avl-double-rotation
kind: trace
version: 2
level: 3
tags: [trees, avl, rotations, tracing]
requires:
  - tree-avl-double-rotation-worked
  - tree-avl-balance-factor
probes:
  1: { mid: "2", low: "1" }
  2: { top: "2", r: "3" }
elaborate: Say in one sentence, as to an interviewer, how the insert path tells you whether one rotation or two is needed.
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Double_rotation
---

The keys 3, 1, 2 went into a plain BST and bent into a zig-zag: 3 has
balance factor +2. `rotate_left(n)` and `rotate_right(n)` return the
subtree's new root; `key(n)` is n's key.

```cpp
//      3
//     /
//    1
//     \
//      2
t.root->left = rotate_left(t.root->left);
int mid = key(t.root->left), low = key(t.root->left->left);   // @1
t.root = rotate_right(t.root);
int top = key(t.root), r = key(t.root->right);                // @2
```

---

The first rotation, at the child 1, lifts 2 above it and **straightens**
the zig-zag into the line 3 / 2 / 1. The second, at 3, then lifts the
middle key 2 to the top, with 1 on its left and 3 on its right. Two O(1)
rotations, and the height drops from 3 levels to 2.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
