---
id: technique-explain-choose-a-technique
kind: explain
version: 1
level: 3
tags: [techniques, judgement, capstone]
requires:
  - technique-exchange-argument
  - technique-pseudo-polynomial
  - technique-pruning-vs-memo
elaborate: If the disk in job (3) were sized in megabytes up to 10⁴, which technique would you switch to, and why?
refs:
  - https://en.wikipedia.org/wiki/Activity_selection_problem
  - https://en.wikipedia.org/wiki/Change-making_problem
  - https://doi.org/10.1145/321296.321300
---

A teammate has three jobs: (1) fit the most talks into one room;
(2) make change with the fewest coins from {1, 7, 10}, amounts up to
1 000; (3) choose some of 40 files, sizes in bytes up to 10¹², that
exactly fill a disk. Which technique would you pick for each, and why?
---
- [ ] (1) Greedy: repeatedly take the talk that ends earliest among those that still fit
- [ ] (1) An exchange argument proves it: swapping an optimal schedule's first talk for greedy's keeps it valid
- [ ] (2) Largest-first greedy fails: it pays 14 with five coins, 10 and four 1s, where 7 + 7 is two
- [ ] (2) DP over amounts: each amount's best is one coin plus the best for what remains, 1 000 cells
- [ ] (3) Backtracking with pruning, since a DP table indexed by byte count would need about 10¹² cells
