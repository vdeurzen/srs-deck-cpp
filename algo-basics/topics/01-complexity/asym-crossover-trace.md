---
id: complexity-asym-crossover-trace
kind: basic
version: 2
level: 1
tags: [foundations, complexity, growth-order]
requires:
  - complexity-asym-little-o
  - interview-essentials/complexity-asym-log-rules
elaborate: When would you still choose the asymptotically slower algorithm, given a crossover like this one?
refs:
  - https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities
  - https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
---

## At n = 32, 10 · n · log₂ n = 1 600 is larger than n² = 1 024. Which of the two is larger for every n beyond some point?

---

**n²: n log n = o(n²), so the constant 10 only delays the crossover.**

n² ≤ 10 · n · log₂ n means n ≤ 10 · log₂ n, true up to n = 58 and never
again. A constant factor on the slower-growing side moves where the
curves cross, never which wins.
