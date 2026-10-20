---
id: complexity-doubling-copies
kind: basic
version: 2
level: 2
tags: [complexity, dynamic-arrays]
requires:
  - complexity-cost-amortized
  - interview-essentials/complexity-geometric-sum-intro
elaborate: Say in one sentence why a single push can still cost O(n), even though 16 pushes made only 15 copies.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://epubs.siam.org/doi/10.1137/0606031
---

```cpp
int cap = 1, size = 0, copies = 0;
void push() {
  if (size == cap) { copies += size; cap *= 2; }   // full: move all
  ++size;
}
```

## How many copies have been made in total after 16 calls to `push()`?

---

**15 = 1 + 2 + 4 + 8, fewer than the 16 pushes.**

Copies happen only when the size reaches a power of two; the 9th push
copies 8 and makes room for pushes 10 to 16. So n pushes copy fewer than
n elements: O(1) each, amortised.
