---
id: tree-bst-delete-trace
kind: trace
version: 1
level: 2
tags: [trees, bst, tracing]
requires:
  - tree-bst-delete-cases
probes:
  1: { r: "60", rl: "30" }
  2: { r: "60", rl: "40" }
  3: { r: "70", rl: "40" }
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
---

`erase(t, k)` replaces a node that has two children by its in-order
successor. `root(t)` is the root's key, `left(t, k)` the key of k's left
child (0 if none).

```cpp
//          50
//        /    \
//      30      70
//     /  \    /  \
//   20    40 60   80
erase(t, 50);
int r = root(t), rl = left(t, r);   // @1
erase(t, 30);
r = root(t);  rl = left(t, r);      // @2
erase(t, 60);
r = root(t);  rl = left(t, r);      // @3
```

---

1. 50 has two children; its successor is 60, the leftmost node right of
   it. 60 moves into the root and its old leaf disappears.
2. 30 has two children; its successor is 40, a leaf, so 40 replaces 30.
3. The root 60 now has children 40 and 70. 70 has no left child, so 70 is
   the successor; it moves up and its right child 80 takes its old place.

Each delete is a search plus a walk down to the successor: O(h). The
in-order sequence only loses the deleted key, which is the point.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
