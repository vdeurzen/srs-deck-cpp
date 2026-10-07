---
id: technique-explain-choose-a-technique
kind: explain
version: 1
level: 3
tags: [greedy, dynamic-programming, backtracking, capstone]
requires:
  - technique-exchange-argument
  - technique-pseudo-polynomial
  - technique-pruning-vs-memo
refs:
  - https://en.wikipedia.org/wiki/Activity_selection_problem
  - https://en.wikipedia.org/wiki/Change-making_problem
  - https://doi.org/10.1145/321296.321300
---

A teammate has three jobs: (1) fit the most talks into one room;
(2) make change with the fewest coins from {1, 7, 10}, amounts up to
1 000; (3) choose some of 40 files, sizes in bytes up to 10¹², that
exactly fill a disk. Which technique for each, and why?
---
- [ ] (1) Greedy: take the talk that ends earliest, repeatedly
- [ ] (1) Safe by an exchange argument: swapping an optimal schedule's first talk for greedy's keeps it conflict-free and the same size
- [ ] (2) Greedy fails: 14 = 10 + 1 + 1 + 1 + 1 is five coins, 7 + 7 is two
- [ ] (2) DP over amounts, `dp[a] = 1 + min over coins c of dp[a − c]`, a table of only 1 000 cells
- [ ] (3) Backtracking with pruning, because a DP table indexed by byte count would need ~10¹² cells
