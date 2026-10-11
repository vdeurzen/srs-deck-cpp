---
id: complexity-cost-nested-not-quadratic
kind: basic
version: 1
level: 2
tags: [foundations, complexity, cost-model, misconception]
requires:
  - complexity-cost-trace-dependent-halving
elaborate: "Find a nested loop in your own code whose inner bound is not a fixed size. Add its per-pass counts: is it really quadratic?"
refs:
  - https://en.wikipedia.org/wiki/Geometric_series#Sum
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Growth_rate_analysis_of_other_resources
---

## A reviewer writes "two nested loops over n, so this is quadratic" on `for (int len = n; len > 0; len /= 2) for (int j = 0; j < len; ++j) step();`. What does the loop actually cost?

---

**Linear: fewer than 2n calls to `step`.** Nesting multiplies only when
the inner count is the same every pass; here it halves, so add the
passes: the first one dominates. The belief sticks because the common
case, both bounds n, is n². Read the inner bound: `j < i` gives n²/2,
`j += i` gives n log n.
