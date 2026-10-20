---
id: complexity-cost-trace-dependent-halving
kind: basic
version: 2
level: 2
tags: [foundations, complexity, cost-model]
requires:
  - interview-essentials/complexity-geometric-sum-intro
  - complexity-cost-trace-triangular
elaborate: Where else does each round of a loop do half the work of the round before, and what does the whole loop cost?
refs:
  - https://en.wikipedia.org/wiki/Geometric_series#Sum
---

```cpp
int steps = 0;
void shrink(int n) {
  for (int len = n; len > 0; len /= 2)
    for (int j = 0; j < len; ++j) ++steps;
}
```

## How many times does `shrink(16)` run `++steps`?

---

**31: 16 + 8 + 4 + 2 + 1, under 2 · 16.**

Each pass does half the work of the one before, so the total stays below
2n: linear. "log n passes of up to n each" multiplies two bounds that are
never large together; add the actual passes.
