---
id: parsons-sift-down
kind: parsons
version: 1
level: 3
tags: [heaps, arrays, invariants]
distractors:
  - "if (h[i] < h[parent]) std::swap(h[i], h[parent]);"
  - "i = (i - 1) / 2;"
compile:
  harness: |
    constexpr std::array<int, 7> heapify(std::array<int, 7> a) {
      for (std::size_t i = a.size() / 2; i-- > 0;) sift_down(a, i);
      return a;
    }
    constexpr std::array<int, 7> kIn{3, 1, 6, 5, 2, 4, 7};
    static_assert(heapify(kIn) == std::array<int, 7>{7, 5, 6, 1, 2, 4, 3});
    static_assert(heapify(std::array<int, 7>{1, 2, 3, 4, 5, 6, 7}) ==
                  std::array<int, 7>{7, 5, 6, 4, 2, 1, 3});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://en.wikipedia.org/wiki/Binary_heap
---

```cpp
#include <array>
#include <cstddef>
#include <utility>
constexpr void sift_down(std::array<int, 7>& h, std::size_t i) {
  const std::size_t n = h.size();
  while (true) {
    std::size_t largest = i;
    const std::size_t left = 2 * i + 1;
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

Restoring the max-heap property below index `i`. The two distractors
are the *sift-up* half of a heap — comparing against the parent and
walking up with `(i − 1) / 2` — which is what `push` needs and what
`pop` must not do.

Three things the order encodes. `largest` is compared against **both**
children before any swap: swapping with the smaller child can leave it
larger than its new parent, so "pick the larger child" is correctness,
not an optimisation. The `largest == i` test is the loop's exit — the
invariant is restored the moment no child beats the parent. And the
bounds checks come before the reads, since a leaf's children are past
the end of the array.

This is the routine underneath `std::pop_heap` and the linear-time
`std::make_heap`, which calls it once per internal node from the
bottom up.

Because the Harness evaluates the result at compile time, an ordering
that compiles but heapifies incorrectly still fails — the Card is
graded on behaviour, not on matching one authored line order
(SPEC §4.8).
