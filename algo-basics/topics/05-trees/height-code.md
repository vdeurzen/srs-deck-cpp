---
id: tree-height-code
kind: code
version: 1
level: 2
tags: [trees, recursion, traversal]
requires:
  - tree-traversal-orders
  - technique-recursion-base-case
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
    static_assert(height(t, 0) == 4);
    static_assert(height(t, 1) == 3);
    static_assert(height(t, -1) == 0);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal
---

Height in levels: an empty tree has 0, a lone node 1. Complete the
recursion.

```cpp
#include <algorithm>

// t.left[v], t.right[v]: child indices, -1 for none
constexpr int height(const auto& t, int v) {
  if (v < 0) return 0;
  const int l = height(t, t.left[v]);
  const int r = height(t, t.right[v]);
  return {{c1::1 + std\::max(l, r)}};
}
```

---

A node's height is one level for itself plus its **taller** subtree,
because the longest path goes down whichever side is longer. Both
subtrees are measured before the node uses them: a postorder traversal,
O(n), since each node is visited once.

`1 + l + r` is the other classic postorder count, the subtree's *size*;
`min` would measure the shortest path to an empty link.
