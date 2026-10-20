---
id: tree-height-code
kind: code
version: 1
level: 2
tags: [trees, recursion, traversal]
requires:
  - tree-traversal-orders
  - technique-call-stack-worked
  - stl-const-auto-param
  - cpp-essentials/constexpr-fn-static-assert
input: chips
choices:
  c1: ["1 + std::max(l, r)", "std::max(l, r)", "1 + std::min(l, r)", "1 + l + r"]
compile:
  harness: |
    struct T { int key[6], left[6], right[6]; };
    //        8
    //       / \
    //      4   9
    //     / \
    //    2   6
    //       /
    //      5
    constexpr T t{{8, 4, 9, 2, 6, 5}, {1, 3, -1, -1, 5, -1}, {2, 4, -1, -1, -1, -1}};
    static_assert(height(t, 0) == 3);
    static_assert(height(t, 1) == 2);
    static_assert(height(t, 3) == 0);
    static_assert(height(t, -1) == -1);
    int main() {}
elaborate: "Which other tree question is the same postorder shape with a different combining step, such as size, sum or diameter?"
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal
---

Height in edges: an empty tree has −1, a lone node 0 (`std::max` and
`std::min` return the larger and the smaller of two values). Complete
the recursion.

```cpp
#include <algorithm>

// t.left[v], t.right[v]: child indices, -1 for none
constexpr int height(const auto& t, int v) {
  if (v < 0) return -1;
  const int l = height(t, t.left[v]);
  const int r = height(t, t.right[v]);
  return {{c1::1 + std\::max(l, r)}};
}
```

---

A node's height is one edge down to its **taller** subtree, plus that subtree's height,
because the longest path goes down whichever side is longer. Both
subtrees are measured before the node uses them: a postorder traversal,
which visits each node once.

`1 + l + r` is the shape of the other classic postorder count, the
subtree's size (with 0 for an empty tree); `min` would measure the
shortest path to an empty link.
