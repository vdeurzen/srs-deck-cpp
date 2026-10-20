---
id: complexity-cost-trace-triangular
kind: basic
version: 2
level: 1
tags: [foundations, complexity, cost-model]
requires:
  - interview-essentials/complexity-cost-product-rule
  - interview-essentials/complexity-arithmetic-sum-intro
elaborate: Where does "compare every pair once" appear in interview problems, and roughly how many steps is it at n = 10⁵?
refs:
  - https://en.wikipedia.org/wiki/Triangular_number
---

```cpp
int steps = 0;
void pairs(int n) {
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < i; ++j) ++steps;
}
```

## `pairs(10)` runs `++steps` 45 times. How many times does `pairs(20)` run it?

---

**190 = 20 · 19 / 2: doubling n about quadruples the steps.**

The inner loop runs 0, 1, …, n − 1 times, so add the passes instead of
multiplying: n(n − 1)/2, every pair once. Four times the steps for twice
the input is the mark of quadratic growth.
