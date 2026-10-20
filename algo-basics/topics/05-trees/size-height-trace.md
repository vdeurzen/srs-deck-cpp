---
id: tree-size-height-trace
kind: trace
version: 2
level: 2
tags: [foundations, trees, recursion, tracing]
requires:
  - tree-node-pointers
  - interview-essentials/technique-call-stack-worked
  - cpp-essentials/ptr-arrow-member
  - interview-essentials/stl-min-max
probes:
  1: { h: "4" }
elaborate: Where else does "combine the children's answers with max" appear, such as the deepest folder or the longest call chain?
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
//             \
//             70
//            /
//          65
int height(const Node* n) {
  if (n == nullptr) return 0;
  return 1 + std::max(height(n->left), height(n->right));
}
int h = height(root);   // @1
```

---

An empty tree answers 0; a node adds 1 to the **larger** of its two
subtrees' heights, not their sum. The longest path, 40 → 60 → 70 → 65,
has 4 levels, while 20's side adds only 1. Counting nodes instead would
give 5. Each node is visited once with O(1) work: O(n).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
