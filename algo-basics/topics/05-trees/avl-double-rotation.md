---
id: tree-avl-double-rotation
kind: trace
version: 1
level: 3
tags: [trees, avl, rotations, tracing]
requires:
  - tree-avl-balance-factor
  - tree-rotation
probes:
  1: { top: "3", mid: "2", low: "1" }
  2: { top: "2", l: "1", r: "3" }
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Double_rotation
---

The keys 3, 1, 2 went into a plain BST and bent into a zig-zag: 3 has
balance factor +2. `rotate_left(n)` and `rotate_right(n)` return the
subtree's new root.

```cpp
//      3
//     /
//    1
//     \
//      2
t.root->left = rotate_left(t.root->left);
int top = key(t.root), mid = key(t.root->left),
    low = key(t.root->left->left);                         // @1
t.root = rotate_right(t.root);
top = key(t.root);
int l = key(t.root->left), r = key(t.root->right);         // @2
```

---

A single right rotation at 3 would lift 1 and leave 2 hanging under 3:
the bend just flips to the other side, still height 3. So the first
rotation, at the child, **straightens** the zig-zag into the line
3 / 2 / 1; the second, at 3, then lifts the middle key 2 to the top.

The rule: when the new key went into the *inside* grandchild (left
child's right, or right child's left), rotate the child first, then the
node. Two O(1) rotations, still O(1).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
