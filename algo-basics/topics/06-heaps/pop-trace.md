---
id: heap-pop-trace
kind: trace
version: 2
level: 2
tags: [heaps, tracing]
requires:
  - heap-pop-worked
  - interview-essentials/heap-sift-down-code
probes:
  1: { r: "9", at: "2" }
elaborate: Say in one sentence, as to an interviewer, why pop moves the last element to the root instead of shifting every element left.
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
---

`pop(h)` moves the last element into the root, shrinks `h` by one and
sifts the root down. `index_of(h, x)` is the slot holding `x`.

```cpp
//           10
//         /    \
//        7      9
//       / \    / \
//      3   5  6   8
std::vector<int> h{10, 7, 9, 3, 5, 6, 8};

pop(h);
int r = h[0], at = index_of(h, 8);   // @1
```

---

8 moves into the root over children 7 and 9 and swaps with 9, the
larger. In slot 2 its only child left is 6 in slot 5 (slot 6 went with
the shrink), and 8 > 6, so it stops: `9 7 8 3 5 6`.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
