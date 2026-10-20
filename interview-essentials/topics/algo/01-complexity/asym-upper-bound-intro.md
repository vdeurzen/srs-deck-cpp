---
id: complexity-asym-upper-bound-intro
kind: basic
version: 1
level: 1
tags: [foundations, complexity, big-o]
requires:
  - complexity-asym-step-model
elaborate: "Say in one sentence why a bound that ignores small n is still the useful one for a routine that will see a million inputs."
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation
---

A routine takes T(n) = 2n + 6 steps.

```text
n         1    3    6    10
2n + 6    8   12   18    26
3n        3    9   18    30
```

## Why is it fair to say T grows no faster than n, although T(1) = 8 is above 3 · 1?

---

**From n = 6 on, T(n) ≤ 3n: a constant times n caps it.**

Small inputs are ignored; past some starting point, T stays under a
fixed multiple of n. That is what "T(n) is O(n)" means. Which multiple
and which start don't matter, only that some pair exists.
