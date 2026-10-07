---
id: heap-array-layout
kind: code
version: 1
level: 3
requires:
  - heap-vocabulary
tags: [heaps, arrays, invariants]
input: chips
choices:
  c1: ["2 * i + 1", "2 * i", "2 * i - 1", "i / 2"]
compile:
  harness: |
    constexpr std::array<int, 7> heapify(std::array<int, 7> a) {
      for (std::size_t i = a.size() / 2; i-- > 0;) sift_down(a, i);
      return a;
    }
    constexpr std::array<int, 7> kIn{3, 1, 6, 5, 2, 4, 7};
    static_assert(heapify(kIn) == std::array<int, 7>{7, 5, 6, 1, 2, 4, 3});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://en.wikipedia.org/wiki/Binary_heap
---

A binary heap is a complete tree stored in an array, with no pointers at
all. Complete the child index.

```cpp
#include <array>
#include <cstddef>
#include <utility>

constexpr void sift_down(std::array<int, 7>& h, std::size_t i) {
  const std::size_t n = h.size();
  while (true) {
    std::size_t largest = i;
    const std::size_t left = {{c1::2 * i + 1}};
    const std::size_t right = left + 1;
    if (left < n && h[left] > h[largest]) largest = left;
    if (right < n && h[right] > h[largest]) largest = right;
    if (largest == i) return;
    std::swap(h[i], h[largest]);
    i = largest;
  }
}
```

---

With a 0-based array the children of `i` are `2i+1` and `2i+2` and the
parent is `(i−1)/2`; `2i` and `i/2` are the 1-based formulas, which is why
some implementations waste slot 0. A complete tree has this canonical
numbering, so the heap needs no links: one allocation, and every
operation walks one root-to-leaf path whose top levels stay in cache.

Swapping with the **larger** child is correctness, not optimisation:
promoting the smaller one puts it above its larger sibling.
