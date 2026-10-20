---
id: tree-avl-insert-trace
kind: trace
version: 2
level: 3
tags: [trees, avl, rotations, tracing]
requires:
  - tree-avl-double-rotation
probes:
  1: { r: "2", rr: "4" }
elaborate: Where would sorted inserts like these hit a tree in real data, and what would a plain BST cost you there?
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Rebalancing
---

`t` is the AVL tree drawn below. `avl_insert(t, k)` is a BST insert
followed by the AVL repair. `root(t)` is the root's key, `right(t, k)`
the key of k's right child.

```cpp
//      2
//     / \
//    1   3
//         \
//          4
avl_insert(t, 5);
int r = root(t), rr = right(t, r);   // @1
```

---

5 lands under 4, and both 3 and 2 reach balance factor −2. The repair
fixes the **lowest** one, 3: a left rotation there lifts 4 over 3 and 5,
giving 2(1, 4(3, 5)). That subtree is back to its old height, so 2 is
balanced again without a rotation of its own, and the root stays 2.

The same sorted keys in a plain BST would make a chain of 5 levels;
this tree has 3.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
