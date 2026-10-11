---
id: tree-size-height-trace
kind: trace
version: 1
level: 2
tags: [foundations, trees, recursion, tracing]
requires:
  - tree-node-pointers
probes:
  1: { s: "6" }
  2: { h: "4", hl: "2" }
refs:
  - https://en.wikipedia.org/wiki/Binary_tree#Properties_of_binary_trees
  - https://xlinux.nist.gov/dads/HTML/height.html
---

`Node` has `key`, `left`, `right`; `nullptr` is the empty tree; `root`
points at the drawn tree. Height counts levels.

```cpp
//        40
//       /  \
//     20    60
//       \     \
//       30     70
//             /
//           65
int size(const Node* n) {
  if (n == nullptr) return 0;
  return 1 + size(n->left) + size(n->right);
}
int height(const Node* n) {
  if (n == nullptr) return 0;
  return 1 + std::max(height(n->left), height(n->right));
}
int s = size(root);                              // @1
int h = height(root), hl = height(root->left);   // @2
```

---

Both functions are the definition run backwards: an empty tree answers
0, a node combines its two subtrees' answers. Size **adds** them (every
node counts), height takes the **larger** (only the longest path
counts): 40 → 60 → 70 → 65 is 4 levels, while 20's subtree has 2.

Each node is visited once with O(1) work, so both walks are O(n).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
