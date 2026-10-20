---
id: technique-explain-dp
kind: explain
version: 1
level: 4
tags: [choosing, optimisation]
requires:
  - technique-dp-overlapping-subproblems
  - technique-dp-optimal-substructure
  - technique-coin-change-table
  - technique-greedy-vs-dp
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Change-making_problem#Dynamic_programming
elaborate: Which problem from your own work asked for a best total built from smaller choices, and what would one table cell have meant there?
---
An interviewer asks how you tell, from a problem statement alone, that
dynamic programming will solve it. Answer aloud.
---
- [ ] Cue: a best count, minimum or maximum built from best answers to smaller subproblems that recur
- [ ] Pattern: one table cell per subproblem, filled so every cell it reads is already filled
- [ ] Example: fewest coins that sum to an amount, each coin value usable any number of times
- [ ] Complexity: distinct subproblems times work per subproblem, so amount × coins for coin change
- [ ] Look-alike: greedy commits to one choice, paying 6 from coins 4, 3, 1 as 4 + 1 + 1
