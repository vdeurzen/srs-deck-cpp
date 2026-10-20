---
id: complexity-cost-product-rule
kind: basic
version: 1
level: 1
tags: [foundations, complexity, cost-model]
requires:
  - complexity-cost-sum-rule
elaborate: "Find a nested loop in your own code: is its inner count fixed, so the counts multiply, or does it depend on the outer index?"
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Growth_rate_analysis_of_other_resources
---

## Decide the cost, in calls to `step`, of `for (int i = 0; i < n; ++i) for (int j = 0; j < m; ++j) step();`

---

**n·m: the inner loop runs m times on each of the n outer passes.**
A loop *inside* another multiplies, as long as the inner count is the
same on every pass. Keep both letters: n·m is only "n²" when m grows
with n. When the inner bound depends on `i`, add the per-pass counts
instead of multiplying.
