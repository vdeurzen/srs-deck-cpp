---
id: technique-greedy-vs-dp
kind: basic
version: 1
level: 2
tags: [greedy, dynamic-programming]
requires:
  - technique-greedy-coins-counterexample
  - technique-coin-change-table
refs:
  - https://en.wikipedia.org/wiki/Greedy_algorithm
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

## Coins {5, 4, 1}, amount 8: greedy pays 5 + 1 + 1 + 1, DP finds 4 + 4. What does DP do at each step that greedy does not?

---

**DP tries every choice and keeps the best; greedy commits to one.**
`dp[8] = 1 + min(dp[3], dp[4], dp[7]) = 1 + min(3, 1, 3) = 2`. Greedy
never looks at "last coin 4". Use greedy only when an exchange argument
proves its one choice safe; otherwise pay DP's amount × coins.
