---
id: heap-push-trace
kind: trace
version: 2
level: 2
tags: [heaps, tracing]
probes:
  1: { "h[2]": "8", "h[6]": "5" }
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
requires:
  - heap-push-worked
  - sort-std-swap
  - cpp-essentials/vector-basics
elaborate: Say aloud why a push into a max-heap is cheap when the new value is small, and when it pays the full height.
---

`push` appends `x` to a max-heap and sifts it up. The parent of slot
`i` is slot `(i - 1) / 2`.

```cpp
//          9
//        /   \
//       7     5
//      / \   /
//     3   6 4
std::vector<int> h{9, 7, 5, 3, 6, 4};
void push(int x) {
  h.push_back(x);
  int i = h.size() - 1;
  while (i > 0 && h[(i - 1) / 2] < h[i]) {
    std::swap(h[(i - 1) / 2], h[i]);
    i = (i - 1) / 2;
  }
}
push(8);   // @1
```

---

8 lands at slot 6, under 5 (slot 2). It beats 5, so they swap: 8 moves
to slot 2 and 5 drops to slot 6. Its new parent is 9 at the root, which
is larger, so the climb stops: `9 7 8 3 6 4 5`.

A push stops as soon as its parent is at least as large, so it climbs
the full height only when the new value is a new maximum.

(Values from running it under GCC 16.2.)
