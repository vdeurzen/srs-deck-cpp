---
id: heap-d-ary-parent
kind: code
version: 1
level: 4
requires:
  - heap-d-ary
  - heap-array-layout
tags: [heaps, arrays, invariants]
input: chips
choices:
  c1: ["(i - 1) / D", "i / D", "(i - 1) / 2", "(i + 1) / D"]
compile:
  harness: |
    constexpr std::array<int, 9> build(std::array<int, 9> a) {
      for (std::size_t i = 1; i < a.size(); ++i) sift_up(a, i);
      return a;
    }
    static_assert(build({1, 2, 3, 4, 5, 6, 7, 8, 9}) ==
                  std::array<int, 9>{9, 8, 2, 3, 4, 1, 5, 6, 7});
    static_assert(build({3, 9, 4, 1, 7, 2, 8, 5, 6}) ==
                  std::array<int, 9>{9, 8, 4, 1, 7, 2, 3, 5, 6});
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/D-ary_heap
  - https://doi.org/10.1145/235141.235145
---

A 4-ary max-heap in a 0-based array, root at slot 0. Complete the
parent index so a push climbs the right path.

```cpp
#include <array>
#include <cstddef>
#include <utility>

constexpr std::size_t D = 4;

constexpr void sift_up(std::array<int, 9>& h, std::size_t i) {
  while (i > 0) {
    const std::size_t p = {{c1::(i - 1) / D}};
    if (h[p] >= h[i]) return;
    std::swap(h[p], h[i]);
    i = p;
  }
}
```

---

Slot 0's children are 1–4, slot 1's are 5–8: child `c` of node `p` is
`D·p + c` for `c` in 1…D, so the parent of `i` is `(i − 1) / D`. The `− 1`
undoes the root's offset exactly as in the binary `(i − 1) / 2`, which is
this formula with D = 2 — and is the most common slip when a binary heap
is widened. `i / D` is the 1-based formula's cousin and sends slot 4 to
slot 1, its own sibling; `(i + 1) / D` sends slot 3 to slot 1.

A real d-ary heap aligns slot 1 to a cache line so the D siblings a
sift-down compares sit in the same line.
