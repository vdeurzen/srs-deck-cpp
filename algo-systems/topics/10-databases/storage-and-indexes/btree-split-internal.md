---
id: db-btree-split-internal
kind: code
version: 1
level: 3
tags: [databases, btree, storage, indexes]
input: chips
choices:
  c1: ["mid + 1", "mid", "mid - 1"]
compile:
  harness: |
    constexpr Inner kFull{10, 20, 30, 40, 50};      // separator keys, overflowed to 5
    static_assert(split_inner(kFull, 2).left_n == 2);
    static_assert(split_inner(kFull, 2).right_n == 2);        // 2 + 2 == 5 - 1
    static_assert(split_inner(kFull, 2).right_first == 40);   // 30 went up
    static_assert(split_inner(kFull, 1).right_n == 3);
    int main() {}
requires:
  - db-btree-split
refs:
  - https://dl.acm.org/doi/10.1145/356770.356776
elaborate: An internal node with k keys has k + 1 children. Count the children each half gets after the split. Where does that leave room for the median?
---

An **internal** B⁺-tree node holds only separator keys. It overflows to
five and splits at a chosen index, whose key goes up to the parent.
Complete where the right node's keys begin.

```cpp
#include <array>
using Inner = std::array<int, 5>;
struct Split { int left_n, separator, right_n, right_first; };

constexpr Split split_inner(const Inner& k, int mid) {
  const int right_begin = {{c1::mid + 1}};
  return {mid, k[mid], 5 - right_begin, k[right_begin]};
}
```

---

**An internal split moves the median up: it appears in neither child.**
Internal keys are signposts, not rows, so the parent's copy is the only
one needed and `left_n + right_n == n − 1`. That is the difference from a
leaf split, which must copy the key up and keep it.
