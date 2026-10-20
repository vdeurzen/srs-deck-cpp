---
id: complexity-geometric-sum-intro
kind: basic
version: 2
level: 1
tags: [foundations, complexity, sums]
refs:
  - https://en.wikipedia.org/wiki/Geometric_series#Sum
---

```cpp
long total = 0;
for (long p = 1; p <= 1048576; p *= 2) total += p;   // 1048576 = 2²⁰
```

## What is `total`, found without adding the terms one by one?

---

**2 097 151 = 2 · 1 048 576 − 1: a doubling series sums to under twice its last term.**

In binary the 21 terms are 21 one-bits, one less than 2²¹. Each term
exceeds all earlier ones together; read backwards, n + n/2 + … < 2n.

(Run under GCC 16.2.)
