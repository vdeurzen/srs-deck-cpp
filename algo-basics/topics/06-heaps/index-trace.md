---
id: heap-index-trace
kind: trace
version: 1
level: 1
tags: [heaps, arrays, tracing]
requires:
  - heap-shape-and-order
  - linear-array-index-contiguity
probes:
  1: { l: "30", r: "50" }
  2: { p: "80" }
refs:
  - https://en.wikipedia.org/wiki/Binary_heap#Heap_implementation
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
---

```cpp
//          90
//        /    \
//       70     80
//      /  \   /
//     30  50 60
std::array<int, 6> h{90, 70, 80, 30, 50, 60};   // level order, root at 0

std::size_t i = 1;
int l = h[2 * i + 1], r = h[2 * i + 2];   // @1
i = 5;
int p = h[(i - 1) / 2];                   // @2
```

---

Level order numbers the slots so that node i's children are 2i + 1 and
2i + 2: 70 at slot 1 has its children at slots 3 and 4, holding 30 and
50. Going up inverts that: the parent of 60 at slot 5 is (5 − 1) / 2 = 2,
which holds 80. Integer division makes both children map to the same parent.

Completeness is what makes this work: no gaps, so the formulas never
point at a missing node in the middle of the array.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
