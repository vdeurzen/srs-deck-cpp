---
id: tree-bst-search-steps
kind: trace
version: 1
level: 2
tags: [foundations, trees, bst, complexity, tracing]
requires:
  - interview-essentials/tree-bst-rule
  - tree-depth-vs-height
probes:
  1: { a: "1", b: "4" }
  2: { c: "4", d: "2" }
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Searching
---

`Node` has `key`, `left`, `right`; `nullptr` is the empty tree; `root`
points at the drawn tree. `visits(n, k)` searches the binary search tree
for `k` and counts the nodes it compares against.

```cpp
//          60
//        /    \
//      25      80
//     /  \       \
//   10    40      95
//        /
//      33
int visits(const Node* n, int k) {
  int v = 0;
  while (n != nullptr) {
    ++v;
    if (k == n->key) break;
    n = k < n->key ? n->left : n->right;
  }
  return v;
}
int a = visits(root, 60), b = visits(root, 33);   // @1
int c = visits(root, 35), d = visits(root, 70);   // @2
```

---

Each comparison goes one level down one path, so a hit costs the key's
**depth** (60 at 1, 33 at 4). A miss costs the depth of the last node
before the empty link: 35 ends below 33, 70 below 80. No search can pass
the **height**, 4 here, so search is O(h): O(log n) only if the tree is
short, O(n) if it is a chain.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
