---
id: complexity-arithmetic-sum-intro
kind: basic
version: 1
level: 1
tags: [foundations, complexity, sums]
refs:
  - https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
---

```cpp
long total = 0;
for (int i = 1; i <= 40; ++i) total += i;
```

## What is `total`, found without adding the terms one by one?

---

**820: 40 terms whose average is (1 + 40)/2 = 20.5.**

Pair the first with the last, the second with the second-last: every
pair sums to 41, and there are 20 pairs. So 1 + 2 + … + n is
n(n + 1)/2, which grows like n².
