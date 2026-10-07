---
id: heap-sift-up-code
kind: code
version: 1
level: 2
tags: [heaps, arrays, invariants]
requires:
  - heap-index-trace
input: chips
choices:
  c1: ["(i - 1) / 2", "i / 2", "(i + 1) / 2", "i - 1"]
compile:
  harness: |
    constexpr std::array<int, 7> build(std::array<int, 7> a) {
      for (std::size_t i = 1; i < a.size(); ++i) sift_up(a, i);
      return a;
    }
    static_assert(build({1, 2, 3, 4, 5, 6, 7}) == std::array<int, 7>{7, 4, 6, 1, 3, 2, 5});
    static_assert(build({3, 1, 6, 5, 2, 4, 7}) == std::array<int, 7>{7, 5, 6, 1, 2, 3, 4});
    int main() {}
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---

A push appends the new value to the max-heap's array and then sifts it
up. Root at slot 0. Complete the index it compares against.

```cpp
#include <array>
#include <cstddef>
#include <utility>

constexpr void sift_up(auto& h, std::size_t i) {
  while (i > 0) {
    const std::size_t p = {{c1::(i - 1) / 2}};
    if (h[p] >= h[i]) return;
    std::swap(h[p], h[i]);
    i = p;
  }
}
```

---

The new value can only break order with its **parent**: everything else
was a heap before. Swap while it beats the parent; each swap climbs one
level, so a push costs at most the height, O(log n).

`i / 2` is the formula for a heap whose root sits at slot 1. With the
root at 0 it sends slot 2 to slot 1, its own sibling.
