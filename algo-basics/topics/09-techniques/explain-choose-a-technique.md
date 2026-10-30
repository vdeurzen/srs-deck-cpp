---
id: technique-explain-choose-a-technique
kind: explain
version: 2
level: 4
tags: [techniques, interview, judgement]
requires:
  - interview-essentials/technique-coin-change-table
  - interview-essentials/technique-dp-optimal-substructure
  - technique-exchange-argument
  - technique-pseudo-polynomial
elaborate: If the coins were {1, 5, 10, 25}, would you still build the table, and what would you have to show before trusting the faster rule?
refs:
  - https://en.wikipedia.org/wiki/Change-making_problem
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

A teammate must make change with the fewest coins from {1, 7, 10},
each usable any number of times, for amounts up to 1 000. They ask
which technique you would pick, and why.
---
- [ ] Dynamic programming over amounts: fewest for a is 1 + fewest for a − c, best over the coins c
- [ ] Largest-first greedy fails: it pays 14 with five coins, 10 and four 1s, where 7 + 7 is two
- [ ] No exchange argument saves greedy: the optimal 7 + 7 holds no 10 to swap in
- [ ] A best payment minus its last coin is a best payment of the rest, so each cell trusts smaller ones
- [ ] About 1 001 cells × 3 coins ≈ 3 000 steps: cheap only because the amount itself is small
