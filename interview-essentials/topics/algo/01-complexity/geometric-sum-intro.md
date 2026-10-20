---
id: complexity-geometric-sum-intro
kind: basic
version: 1
level: 1
tags: [foundations, complexity, sums]
refs:
  - https://en.wikipedia.org/wiki/Geometric_series#Sum
---

```cpp
long total = 0;
for (long p = 1; p <= 64; p *= 2) total += p;
```

## What is `total`, found without adding the terms one by one?

---

**127 = 2 · 64 − 1: a doubling series sums to less than twice its last term.**

In binary, 1 + 2 + … + 64 is 1111111₂, one less than 10000000₂ = 128.
Each term exceeds all the earlier ones together, so the last term
dominates; read backwards, n + n/2 + n/4 + … < 2n.
