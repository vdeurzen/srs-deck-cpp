---
id: tree-level-order-code
kind: code
version: 1
level: 2
tags: [trees, traversal, queues, bfs]
requires:
  - tree-traversal-orders
  - linear-queue-ring
input: chips
choices:
  c1: ["head++", "--tail", "head", "tail - 1"]
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
    static_assert(level_order(t) == std::array<int, 6>{8, 4, 9, 2, 6, 5});
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search
---

Level order visits the root, then all of level 2 left to right, then
level 3, and so on. Node 0 is the root. Complete the line that takes the
next node to visit.

```cpp
#include <array>

constexpr std::array<int, 6> level_order(const auto& t) {
  std::array<int, 6> pending{0}, out{};
  int head = 0, tail = 1, n = 0;
  while (head < tail) {
    const int v = pending[{{c1::head++}}];
    out[n++] = t.key[v];
    if (t.left[v] >= 0) pending[tail++] = t.left[v];
    if (t.right[v] >= 0) pending[tail++] = t.right[v];
  }
  return out;
}
```

---

Taking from the front makes `pending` a **queue**: children join at the
back, so every node of level k leaves before any of level k + 1. That is
breadth-first search on a tree, O(n).

`--tail` takes the newest entry instead, a stack, and turns the walk
depth-first (8 9 4 6 5 2 here, right side first). Level order is also the
order in which a heap stores a tree in an array.
