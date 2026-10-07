---
id: ordered-eytzinger-step
kind: code
version: 1
level: 5
requires:
  - ordered-eytzinger-layout
tags: [binary-search, branchless, memory-hierarchy, layout]
input: chips
choices:
  c1:
    - "2 * k + (kTree[k] < key)"
    - "2 * k + (kTree[k] > key)"
    - "2 * k + 1"
    - "k / 2 + (kTree[k] < key)"
compile:
  harness: |
    static_assert(descend(2) == 8);
    static_assert(descend(4) == 10);
    static_assert(descend(6) == 12);
    static_assert(descend(8) == 14);
    static_assert(descend(9) == 15);
    int main() {}
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
---

The Eytzinger layout stores the implicit binary search tree in
breadth-first order: the root at index 1, the children of `k` at `2k`
and `2k+1`. Complete the descent.

```cpp
#include <array>
#include <cstddef>

// The sorted values 2..8 laid out breadth-first; index 0 is unused.
inline constexpr std::array<int, 8> kTree{0, 5, 3, 7, 2, 4, 6, 8};

constexpr std::size_t descend(int key) {
  std::size_t k = 1;
  while (k < kTree.size()) k = {{c1::2 * k + (kTree[k] < key)}};
  return k;
}
```

---

The comparison's result *is* the child selector: `false` is 0 (left),
`true` is 1 (right), so each step is a shift, an add and a compare, with
no branch. `>` walks the mirror-image path; `2 * k + 1` ignores the key;
`k / 2` climbs towards the root instead of descending. The loop runs off
the end of the array on purpose: `k` is left encoding the path taken.
