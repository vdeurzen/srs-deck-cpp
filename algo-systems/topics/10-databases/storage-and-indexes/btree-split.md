---
id: db-btree-split
kind: code
version: 1
level: 3
tags: [databases, btree, storage, indexes]
input: chips
choices:
  c1: ["mid", "mid + 1", "mid - 1"]
compile:
  harness: |
    constexpr Leaf kFull{10, 20, 30, 40, 50};       // capacity 4, overflowed to 5
    static_assert(split_leaf(kFull, 2).left_n == 2);
    static_assert(split_leaf(kFull, 2).right_n == 3);         // no row lost: 2 + 3 == 5
    static_assert(split_leaf(kFull, 2).right_first == 30);    // == the separator
    static_assert(split_leaf(kFull, 1).right_n == 4);
    int main() {}
requires:
  - ordered-bplus-tree
refs:
  - https://dl.acm.org/doi/10.1145/356770.356776
elaborate: A range scan walks the leaf level from the separator's key onwards. What would it miss if the separator's row had left the leaves?
---

A B⁺-tree **leaf** overflows to five keys and splits at a chosen index;
the key there becomes the separator in the parent. Complete where the
right leaf's keys begin.

```cpp
#include <array>
using Leaf = std::array<int, 5>;
struct Split { int left_n, separator, right_n, right_first; };

constexpr Split split_leaf(const Leaf& k, int mid) {
  const int right_begin = {{c1::mid}};
  return {mid, k[mid], 5 - right_begin, k[right_begin]};
}
```

---

**A leaf split copies the separator up: the key stays in the right
leaf.** Leaves hold the rows, so every key must remain in some leaf, and
`left_n + right_n == n`. Starting the right leaf one past the separator
compiles and silently drops a row from the table.
