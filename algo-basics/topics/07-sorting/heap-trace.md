---
id: sort-heap-trace
kind: trace
version: 1
level: 2
tags: [tracing, sorting, heap-sort]
probes:
  1: { a: "8 5 3 1 9" }
  2: { a: "5 1 3 8 9" }
requires:
  - sort-heap-sort
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/sort_heap
---

Two heap-sort steps on a max-heap. `sift_down(a, i, n)` sinks `a[i]`
within the heap `a[0, n)`. Write `a` as space-separated values.

```cpp
auto sift_down = [](std::array<int, 5>& a, std::size_t i, std::size_t n) {
  while (2 * i + 1 < n) {
    std::size_t c = 2 * i + 1;                  // larger child
    if (c + 1 < n && a[c + 1] > a[c]) ++c;
    if (a[i] >= a[c]) break;
    std::swap(a[i], a[c]);
    i = c;
  }
};
std::array a{9, 5, 8, 1, 3};                    // a max-heap
std::swap(a[0], a[4]); sift_down(a, 0, 4);      // @1
std::swap(a[0], a[3]); sift_down(a, 0, 3);      // @2
```

---

Step 1 moves the max, 9, to the end; 3 sinks below its larger child 8,
leaving the heap `8 5 3 1` and the sorted suffix `9`. Step 2 moves 8 to
slot 3, and 1 sinks below 5. **Each step: one swap plus ≤ log₂ n sift
levels.** (Run with GCC 16.2.)
