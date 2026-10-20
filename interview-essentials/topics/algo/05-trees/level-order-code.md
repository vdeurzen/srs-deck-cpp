---
id: tree-level-order-code
kind: code
version: 1
level: 2
tags: [trees, traversal, queues, bfs]
requires:
  - tree-traversal-orders
  - linear-queue-ring
  - cpp-essentials/expr-increment-value
  - stl-const-auto-param
elaborate: "Which other problems need 'all of level k before level k + 1', such as the nearest exit in a grid or the fewest moves in a puzzle?"
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
    // nodes numbered out of level order: index 0..5 holds 8 2 9 4 5 6
    constexpr T t{{8, 2, 9, 4, 5, 6}, {3, -1, -1, 1, -1, 4}, {2, -1, -1, 5, -1, -1}};
    static_assert(level_order(t) == 849265);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search
---

Level order visits the root, then all of level 2 left to right, then
level 3, and so on. Node 0 is the root; the result lists the keys in
visit order as decimal digits (`constexpr` lets the compiler run it).
Complete the line that takes the next node to visit.

```cpp
// t.key[v], t.left[v], t.right[v]: node v; -1 means no child
constexpr int level_order(const auto& t) {
  int pending[6] = {0}, head = 0, tail = 1, digits = 0;
  while (head < tail) {
    const int v = pending[{{c1::head++}}];
    digits = digits * 10 + t.key[v];
    if (t.left[v] >= 0) pending[tail++] = t.left[v];
    if (t.right[v] >= 0) pending[tail++] = t.right[v];
  }
  return digits;
}
```

---

Taking from the front makes `pending` a **queue**: children join at the
back, so every node of level k leaves before any of level k + 1. That is
breadth-first search on a tree, O(n).

`--tail` takes the newest entry instead, a stack, and turns the walk
depth-first (8 9 4 6 5 2 here, right side first).
