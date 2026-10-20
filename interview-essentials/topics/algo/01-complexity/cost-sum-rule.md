---
id: complexity-cost-sum-rule
kind: basic
version: 2
level: 1
tags: [foundations, complexity, cost-model]
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Growth_rate_analysis_of_other_resources
---

## A function runs a loop of n passes, then a loop of n/2 passes, then a loop of a fixed 1 000 passes, one step per pass. How many steps in total?

---

**n + n/2 + 1 000: blocks that run one after another add.**

Each loop finishes before the next starts, so no pass of one repeats
inside another: nothing multiplies. For n = 10 000 that is
10 000 + 5 000 + 1 000 = 16 000 steps.
