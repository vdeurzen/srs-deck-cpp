---
id: complexity-cost-trace-single-loop
kind: basic
version: 2
level: 1
tags: [foundations, complexity, cost-model]
elaborate: Where in your own code does a loop's cost depend on something other than its number of passes?
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
---

```cpp
int steps = 0;
void scan(int lo, int hi) {
  for (int i = lo; i < hi; ++i) ++steps;
}
```

## `scan(0, 1000)` runs `++steps` 1 000 times. How many times does `scan(500, 1500)` run it?

---

**1 000 as well: a loop costs its number of passes, `hi − lo`.**

Only the length of the range counts, never how large the indices are.
The body costs the same on every pass, so the total grows linearly
with n = hi − lo.
