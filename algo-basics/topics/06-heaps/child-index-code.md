---
id: heap-child-index-code
kind: code
version: 1
level: 1
tags: [foundations, heaps, arrays]
input: chips
choices:
  c1: ["2 * i + 1", "2 * i", "i + 1", "2 * i + 2"]
compile:
  harness: |
    static_assert(left(0) == 1 && right(0) == 2);
    static_assert(left(1) == 3 && right(1) == 4);
    static_assert(left(2) == 5 && right(2) == 6);
    static_assert(left(6) == 13);
    int main() {}
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Binary_heap#Heap_implementation
---

A complete binary tree (every level full except the last, filled from
the left) is stored level by level in an array, root at slot 0. Complete
the slot of node `i`'s left child.

```cpp
#include <cstddef>
//            a          slot:  0 1 2 3 4 5
//          /   \        key:   a b c d e f
//         b     c
//        / \   /
//       d   e f
constexpr std::size_t left(std::size_t i) { return {{c1::2 * i + 1}}; }
constexpr std::size_t right(std::size_t i) { return left(i) + 1; }
```

---

Every node before `i` puts its two children ahead of `i`'s, and the
root's children start at slot 1, so `i`'s children land at 2i + 1 and
2i + 2: b (slot 1) has d and e at 3 and 4.

No pointers and no gaps, because the tree is complete. `2 * i` is the
formula for an array whose root sits at slot 1.
