---
id: tree-bst-delete-trace
kind: trace
version: 2
level: 2
tags: [trees, bst, tracing]
requires:
  - tree-bst-delete-worked
  - interview-essentials/tree-bst-delete-cases
probes:
  1: { r: "60", l: "65" }
elaborate: Say in one sentence, as to an interviewer, why removing the successor never runs into the two-children case again.
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
---

`erase(t, k)` replaces a node that has two children by its in-order
successor. `root(t)` is the root's key, `left(t, k)` the key of k's left
child.

```cpp
//          50
//        /    \
//      30      70
//     /  \    /  \
//   20    40 60   80
//              \
//               65
erase(t, 50);
int r = root(t), l = left(t, 70);   // @1
```

---

50 has two children. Its successor is the leftmost node right of it: one
step right to 70, then left to 60, which has no left child. 60 is copied
into the root, and its old node goes by the one-child case: its right
child 65 becomes 70's left child. The in-order sequence just loses 50,
at O(h) for the search and the walk down.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
