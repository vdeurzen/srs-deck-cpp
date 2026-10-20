---
id: technique-knapsack-worked
kind: basic
version: 1
level: 2
tags: [dynamic-programming, knapsack, worked-example]
requires:
  - technique-coin-change-worked
refs:
  - https://en.wikipedia.org/wiki/Knapsack_problem#0-1_knapsack_problem
  - https://doi.org/10.1287/opre.5.2.266
---

One item, weight 2 and value 3, may be packed **at most once**. `dp[w]`
is the best value within weight `w`, all 0 before the item; one pass
over `w` updates the cells in place with the better of `dp[w]` and
`dp[w − 2] + 3`. The same pass, run downwards and then upwards:

| order | w | reads dp[w − 2] | new dp[w] |
| --- | --- | --- | --- |
| down | 4, 3, 2 | 0, 0, 0 (not yet updated) | 3, 3, 3 |
| up | 2 | dp[0] = 0 | 3 |
| up | 3 | dp[1] = 0 | 3 |
| up | 4 | dp[2] = 3 (updated this pass) | 6 |

## Why does the upward pass end with `dp[4]` = 6, packing the one item twice?

---

**At w = 4 it reads `dp[2]`, which already includes this item from w = 2.**

Going down, every cell read is still from before the item, so the item
counts at most once. Going up, a cell can build on itself from earlier
in the same pass: that is reuse.
