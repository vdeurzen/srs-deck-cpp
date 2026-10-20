---
id: complexity-count-loop-steps
kind: basic
version: 2
level: 1
tags: [complexity, big-o]
requires:
  - complexity-cost-product-rule
  - complexity-arithmetic-sum-intro
  - complexity-big-o-scaling
elaborate: "Where else does 'every pair once' appear in a problem, such as all pairs of players or every two points, and what does it cost?"
refs:
  - https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
---

For `n = 4`, `++b` runs 3 + 2 + 1 + 0 = 6 times.

## For `n = 16`, how many times does `++b` run?

```cpp
for (int i = 0; i < n; ++i)
  for (int j = i + 1; j < n; ++j) ++b;
```

---

**120 = n(n − 1)/2: every pair once, still O(n²).**

Pass `i` runs n − 1 − i times: 15 + 14 + … + 0, so the counts add
rather than multiply. Starting at `i + 1` halves the constant, not the
growth.
(Run under GCC 16.2.)
