---
id: complexity-log-halvings
kind: basic
version: 2
level: 1
tags: [complexity, logarithms]
requires:
  - complexity-log2-count
  - complexity-big-o-scaling
elaborate: "Name a place in your own code that halves its remaining work each step, and say how many steps a billion inputs would take."
refs:
  - https://en.wikipedia.org/wiki/Binary_logarithm
---

## `/` on `int`s drops the fraction (7 / 2 == 3), and `halvings(16)` returns 4 (16 → 8 → 4 → 2 → 1). How many steps does `halvings(1000)` take?

```cpp
int halvings(int n) {
  int steps = 0;
  while (n > 1) { n /= 2; ++steps; }
  return steps;
}
```

---

**9: 2⁹ = 512 ≤ 1000 < 1024, so log₂ 1000 rounded down.**

Dropping the fraction never adds a step. Halving loops are O(log n):
a million takes 19, a thousand times more input for ten more steps. Anything that halves its
remaining work (binary search, walking down a balanced tree) inherits
this log.

(Run under GCC 16.2.)
