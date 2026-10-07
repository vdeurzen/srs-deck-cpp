---
id: heap-heapify-order-code
kind: code
version: 1
level: 2
tags: [heaps, arrays, invariants]
requires:
  - heap-sift-down-code
input: chips
choices:
  c1:
    - "std::size_t i = h.size() / 2; i-- > 0;"
    - "std::size_t i = 0; i < h.size() / 2; ++i"
    - "std::size_t i = 1; i < h.size(); ++i"
compile:
  harness: |
    #include <array>
    constexpr void sift_down(auto& h, std::size_t i) {
      const std::size_t n = h.size();
      for (std::size_t c; (c = 2 * i + 1) < n; i = c) {
        if (c + 1 < n && h[c + 1] > h[c]) ++c;
        if (h[i] >= h[c]) return;
        std::swap(h[i], h[c]);
      }
    }
    constexpr std::array<int, 7> built(std::array<int, 7> a) { heapify(a); return a; }
    static_assert(built({1, 2, 3, 4, 5, 6, 7}) == std::array<int, 7>{7, 5, 6, 4, 2, 1, 3});
    static_assert(built({3, 1, 6, 5, 2, 4, 7}) == std::array<int, 7>{7, 5, 6, 1, 2, 4, 3});
    int main() {}
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
---

Floyd's heapify turns an arbitrary array into a max-heap in place by
sifting nodes down. `sift_down` is the one from `heap-sift-down-code`.
Complete the loop.

```cpp
#include <cstddef>
#include <utility>

constexpr void sift_down(auto& h, std::size_t i);

constexpr void heapify(auto& h) {
  for ({{c1::std\::size_t i = h.size() / 2; i-- > 0;}}) sift_down(h, i);
}
```

---

Go **bottom-up**, from the last internal node back to the root. Sift-down
assumes both subtrees below i are already heaps, and going backwards makes
that true; slots from n/2 on are leaves, already heaps of one, so they are
skipped.

Top-down (`i = 0` upward) sifts the root while its subtrees are still
unsorted: from 1 2 3 4 5 6 7 it leaves 3 at the root above 7.
