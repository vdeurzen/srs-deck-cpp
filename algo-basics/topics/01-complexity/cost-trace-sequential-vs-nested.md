---
id: complexity-cost-trace-sequential-vs-nested
kind: basic
version: 2
level: 1
tags: [foundations, complexity, cost-model]
requires:
  - interview-essentials/complexity-cost-sum-rule
  - interview-essentials/complexity-cost-product-rule
elaborate: In code you reviewed recently, which loops were nested and which merely followed each other, and what did that make the cost?
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Growth_rate_analysis_of_other_resources
---

```cpp
const int n = 20;
int a = 0, b = 0;
for (int i = 0; i < n; ++i) ++a;
for (int j = 0; j < n; ++j) ++a;     // a ends at 40
for (int i = 0; i < n; ++i)
  for (int j = 0; j < n; ++j) ++b;
```

## The two loops one after the other leave `a` at 40. What do the nested loops leave `b` at?

---

**400: nested loops multiply, n · n, where loops in sequence add.**

At n = 20 the two shapes are 10× apart; at n = 10⁶ they are a million
times apart. The first thing to see in any piece of code is which loops
are nested and which merely follow.
