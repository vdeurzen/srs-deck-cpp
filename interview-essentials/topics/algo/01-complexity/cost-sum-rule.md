---
id: complexity-cost-sum-rule
kind: basic
version: 1
level: 1
tags: [foundations, complexity, cost-model]
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Growth_rate_analysis_of_other_resources
---

## Decide the cost: a function runs a loop of n passes, then a second loop of n passes, then a loop of a fixed 1 000 passes. In steps, how does the total grow with n?

---

**Like n: the parts add, 2n + 1 000, and the fixed part stops mattering.**
Blocks that run one after another add their costs; nothing here
multiplies. In a sum the fastest-growing part decides: for n in the
millions the 1 000 is noise and the 2 is a constant factor, so the
function is "linear in n".
