---
id: complexity-log-halvings
kind: basic
version: 2
level: 1
tags: [complexity, logarithms]
requires:
  - complexity-count-loop-steps
elaborate: "Name a place in your own code that halves its remaining work each step, and say how many steps a billion inputs would take."
refs:
  - https://en.wikipedia.org/wiki/Binary_logarithm
---

## `/` on `int`s drops the fraction (7 / 2 == 3). How many steps does `halvings(1000)` take?

```cpp
int halvings(int n) {        // halve until n reaches 1
  int steps = 0;
  while (n > 1) { n /= 2; ++steps; }
  return steps;
}
```

---

**9: 2⁹ = 512 ≤ 1000 < 1024, so log₂ 1000 rounded down.**

Small case: 8 → 4 → 2 → 1 is 3 steps. A million takes 19: a thousand
times more input, ten more steps. Anything that halves its remaining
work (binary search, walking down a balanced tree) inherits this log.

(Run under GCC 16.2.)
