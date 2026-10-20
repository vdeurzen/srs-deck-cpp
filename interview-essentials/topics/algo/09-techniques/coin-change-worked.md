---
id: technique-coin-change-worked
kind: basic
version: 1
level: 2
tags: [dynamic-programming, worked-example]
requires:
  - technique-dp-optimal-substructure
  - technique-memo-vs-table
refs:
  - https://en.wikipedia.org/wiki/Change-making_problem#Dynamic_programming
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

Coins {1, 3}, each usable any number of times, amount 4. `dp[a]` is the
fewest coins that pay `a`, with `dp[0] = 0`; each cell tries every last
coin and keeps the smaller candidate.

| a | last coin 1 | last coin 3 | dp[a] |
| --- | --- | --- | --- |
| 1 | dp[0] + 1 = 1 | — | 1 |
| 2 | dp[1] + 1 = 2 | — | 2 |
| 3 | dp[2] + 1 = 3 | dp[0] + 1 = 1 | 1 |
| 4 | dp[3] + 1 = 2 | dp[1] + 1 = 2 | 2 |

## Row 4's "last coin 1" candidate is 2, not 4 (1 + 1 + 1 + 1). Why?

---

**It reads `dp[3]`, which coin 3 already lowered to 1, so it builds on 3 + 1.**

Every cell holds the best answer for its amount by the time a later
row reads it, so a candidate is always "last coin plus the best rest",
never one fixed way of paying the rest.
