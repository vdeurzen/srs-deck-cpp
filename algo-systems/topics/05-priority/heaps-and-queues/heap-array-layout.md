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
parent is `(i−1)/2`; with a 1-based array they are the prettier `2i`,
`2i+1` and `i/2`, which is why textbooks and some implementations waste
slot 0. Either way the structural point is that a *complete* tree — every
level full except the last, which is filled left to right — has a
canonical numbering, so the tree needs no stored links and the whole
heap is one contiguous allocation.

That is most of why heaps are fast in practice despite being a tree:
`push_heap`/`pop_heap` touch one root-to-leaf path, the path's early
levels are always in cache (the top of the heap is a handful of lines,
hot for every operation), and there is nothing to allocate.

`sift_down` restores the invariant *below* `i` in O(log n) by repeatedly
swapping with the larger child; `sift_up` (used by push) does the mirror
image. Note the subtle requirement in the loop: comparing against the
larger of the two children is not an optimisation, it is correctness —
swapping with the smaller one can leave that child larger than its new
parent.

Two C++ notes. `std::priority_queue` is this, over a `vector`, with the
`std::*_heap` algorithms underneath — and `std::make_heap` is the
linear-time bottom-up build, not `n` pushes. And the default is a **max**
heap, so a min-queue needs `std::greater<>` as the comparator — the most
common source of an inverted priority queue in production.
