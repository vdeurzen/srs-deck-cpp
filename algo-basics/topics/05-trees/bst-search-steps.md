---
id: tree-bst-search-steps
kind: trace
version: 2
level: 2
tags: [foundations, trees, bst, complexity, tracing]
requires:
  - tree-bst-search-worked
  - tree-depth-vs-height
  - cpp-essentials/ptr-arrow-member
  - cpp-essentials/expr-conditional-operator
probes:
  1: { v: "4" }
elaborate: What would this loop cost on a BST built by inserting sorted keys, and why?
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Searching
---

`Node` has `key`, `left`, `right`; `nullptr` is the empty tree; `root`
points at the drawn tree. The loop searches it for 35, counting the
nodes it compares against in `v`.

```cpp
//          60
//        /    \
//      25      80
//     /  \       \
//   10    40      95
//        /
//      33
int v = 0;
const Node* n = root;
while (n != nullptr) {
  ++v;
  if (n->key == 35) break;
  n = 35 < n->key ? n->left : n->right;
}
// @1
```

---

35 is not in the tree. The search compares 60, 25, 40 and 33, then steps
to 33's empty right link and stops: a miss costs the depth of the last
node before the empty link, here 4. No search can pass the **height**,
4 here, so search is O(h).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
