---
id: tree-height-code
kind: code
version: 1
level: 2
tags: [trees, recursion, traversal]
requires:
  - tree-terms-height
  - technique-call-stack-worked
  - tree-node-links
  - cpp-essentials/ptr-arrow-member
input: chips
choices:
  c1: ["1 + std::max(l, r)", "std::max(l, r)", "1 + std::min(l, r)", "1 + l + r"]
compile:
  harness: |
    //        8
    //       / \
    //      4   9
    //     / \
    //    2   6
    //       /
    //      5
    constexpr Node n5{5, nullptr, nullptr}, n2{2, nullptr, nullptr}, n9{9, nullptr, nullptr};
    constexpr Node n6{6, &n5, nullptr}, n4{4, &n2, &n6}, n8{8, &n4, &n9};
    static_assert(height(&n8) == 3);
    static_assert(height(&n4) == 2);
    static_assert(height(&n2) == 0);
    static_assert(height(nullptr) == -1);
    int main() {}
elaborate: "Which other tree question has this shape, both subtrees first and then one combining step, such as size, sum or diameter?"
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal
  - https://en.cppreference.com/w/cpp/algorithm/max
---

Height in edges: an empty tree has −1, a lone node 0 (`std::max` and
`std::min` return the larger and the smaller of two values). Complete
the recursion.

```cpp
#include <algorithm>
struct Node { int key; const Node* left; const Node* right; };

constexpr int height(const Node* n) {
  if (n == nullptr) return -1;
  const int l = height(n->left);
  const int r = height(n->right);
  return {{c1::1 + std\::max(l, r)}};
}
```

---

A node's height is one edge down to its **taller** subtree, plus that
subtree's height, because the longest path goes down whichever side is
longer. Both subtrees are measured before the node uses them, so each
node is visited once: O(n).

`1 + l + r` is the shape of another classic count, the subtree's size
(with 0 for an empty tree); `min` would measure the shortest path to an
empty link.
