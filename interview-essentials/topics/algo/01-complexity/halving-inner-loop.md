---
id: complexity-halving-inner-loop
kind: basic
version: 2
level: 2
tags: [complexity, logarithms]
requires:
  - complexity-log-halvings
  - complexity-geometric-sum-intro
elaborate: "Where else does a shrinking inner loop make a loop nest cheaper than outer count × n suggests?"
refs:
  - https://en.wikipedia.org/wiki/Geometric_series
---

## The outer loop runs log₂ n times. How does the number of `++work` runs grow with n?

```cpp
for (int i = n; i > 0; i /= 2)
  for (int j = 0; j < i; ++j) ++work;
```

---

**O(n): the inner counts halve, n + n/2 + … + 1 < 2n.**

For n = 64: 64 + 32 + … + 1 = 127. Multiplying loop counts is only
safe when the inner count is the same every pass. When it shrinks
geometrically, add the series: the first term dominates.
(Run under GCC 16.2.)
