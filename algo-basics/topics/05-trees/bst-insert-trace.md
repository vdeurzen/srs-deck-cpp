---
id: tree-bst-insert-trace
kind: trace
version: 2
level: 2
tags: [trees, bst, tracing]
requires:
  - tree-bst-search-code
probes:
  1: { p: "45", d: "5" }
elaborate: Say in one sentence, as to an interviewer, why a BST insert never has to move an existing node.
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Insertion
---

`t` is the BST drawn below. `insert(t, k)` is a plain BST insert.
`parent(t, k)` is the key of k's parent; `depth(t, k)` counts levels,
the root being 1.

```cpp
//          50
//        /    \
//      30      70
//     /  \    /  \
//   20    40 60   80
//        /  \
//      35    45
insert(t, 42);
int p = parent(t, 42), d = depth(t, 42);   // @1
```

---

Insert is a search that runs off the tree: 42 turns left at 50, right at
30, right at 40 and left at 45, then hangs from 45's empty left link, on
a fifth level. Insert costs what a search costs, O(h).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
