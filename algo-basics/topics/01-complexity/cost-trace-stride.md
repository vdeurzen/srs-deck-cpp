---
id: complexity-cost-trace-stride
kind: basic
version: 2
level: 1
tags: [foundations, complexity, cost-model]
requires:
  - complexity-cost-trace-single-loop
elaborate: Say in one sentence, as to an interviewer, why stepping by 3 or by 10 never changes a loop's growth class.
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
---

```cpp
int steps = 0;
void stride(int n) {
  for (int i = 0; i < n; i += 3) ++steps;
}
```

## `stride(100)` runs `++steps` 34 times. How many times does `stride(10000)` run it?

---

**3 334: a hundred times the input, a hundred times the steps.**

The loop runs n / 3 times, rounded up. A fixed stride divides the cost
by a constant, which growth analysis ignores, so the cost is still
linear in n; changing 3 to 10 changes the constant, never the shape.
