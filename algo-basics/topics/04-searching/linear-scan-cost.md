---
id: search-linear-scan-cost
kind: basic
version: 1
level: 1
tags: [foundations, linear-search, complexity]
requires:
  - search-linear-scan-code
refs:
  - https://en.wikipedia.org/wiki/Linear_search#Analysis
---

```cpp
for (int i = 0; i < n; ++i)
  if (a[i] == key) return i;
return -1;
```

## `a` holds 1000 values in no particular order. In the worst case, what is the minimum number of comparisons any correct method needs to report whether `key` is there?

---

**1000: when `key` is absent, any unchecked element could have been it.**

So this scan is already optimal: a miss costs n comparisons, Θ(n).
A hit at a uniformly random position costs (n + 1)/2 on average, still Θ(n). Doing
better needs extra structure, such as sorted order.
