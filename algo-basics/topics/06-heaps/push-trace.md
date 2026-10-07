---
id: heap-push-trace
kind: trace
version: 1
level: 2
tags: [heaps, tracing]
requires:
  - heap-sift-up-code
probes:
  1: { s: "2", at: "0" }
  2: { s: "1", at: "3" }
  3: { s: "0", at: "8" }
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---

`push(h, x)` appends `x`, sifts it up, and returns the number of swaps.
`index_of(h, x)` is the slot holding `x`.

```cpp
//          9
//        /   \
//       7     8
//      / \   /
//     3   5 6
std::vector<int> h{9, 7, 8, 3, 5, 6};

int s = push(h, 10), at = index_of(h, 10);   // @1
s = push(h, 4);  at = index_of(h, 4);        // @2
s = push(h, 2);  at = index_of(h, 2);        // @3
```

---

1. 10 lands at slot 6 under 8, beats it, then beats 9: two swaps, root.
   The array is now 10 7 9 3 5 6 8.
2. 4 lands at slot 7 under 3 (slot 3), swaps once, then stops below 7.
3. 2 lands at slot 8 under 4 and is already in order: no swaps.

A push stops as soon as its parent is at least as large, so it pays the
height only when the new value is a new maximum.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
