---
id: heap-build-swap-count
kind: trace
version: 1
level: 3
tags: [heaps, complexity, tracing]
requires:
  - heap-build-linear
  - heap-array-layout
probes:
  1: { push: "34" }
  2: { bulk: "11" }
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
---

```cpp
// a and b: std::array<int, 15> holding 1, 2, ..., 15 (a full 4-level tree).
// sift_down(h, i) is heap-array-layout's; it and sift_up count every swap.
void sift_up(std::array<int, 15>& h, std::size_t i) {
  while (i > 0 && h[(i - 1) / 2] < h[i]) {
    std::swap(h[(i - 1) / 2], h[i]); ++swaps; i = (i - 1) / 2;
  }
}

swaps = 0;
for (std::size_t i = 1; i < a.size(); ++i) sift_up(a, i);  // 14 pushes
int push = swaps;                                           // @1
swaps = 0;
for (std::size_t i = b.size() / 2; i-- > 0;) sift_down(b, i);  // make_heap
int bulk = swaps;                                           // @2
```

---

Increasing input into a max-heap is the push-build's worst case: slot 0
is already a heap of one, and each of the 14 later elements is the
largest so far and climbs to the root, paying its full depth. Depths
1, 1, 2, 2, 2, 2 and eight 3s sum to 2 + 8 + 24 = **34**.

The bottom-up build pays each internal node's *height* at most: four
nodes of height 1, two of height 2, one of height 3, so at most
4 + 4 + 3 = **11** — and this input hits that bound exactly. The leaves,
half the array, cost nothing. Both arrays end with 15 at the root.

Grow the tree and the gap widens: the push-build's total is about
n log n, the bulk build's stays below n.

Verified by compiling and running an instrumented copy (with
heap-array-layout's `sift_down` widened to 15 elements) under GCC 16.2,
`g++ -std=c++23 -Wall -Wextra`, printing both counters.
