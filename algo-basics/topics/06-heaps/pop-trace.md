---
id: heap-pop-trace
kind: trace
version: 1
level: 2
tags: [heaps, tracing]
requires:
  - heap-sift-down-code
probes:
  1: { r: "9", at: "2" }
  2: { r: "8", at: "2" }
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
pop(h);
r = h[0];  at = index_of(h, 6);      // @2
```

---

1. 8 moves to the root over children 7 and 9. It swaps with 9, the larger,
   and stops at slot 2 above its new only child, 6.
2. The array is 9 7 8 3 5 6. Now 6 moves up over 7 and 8, swaps with 8,
   and lands in slot 2, which has no children left.

Swapping with 7 instead would leave 7 above 8 or 9 at once: the larger
child is the only safe choice. Each pop is one root-to-leaf walk.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
