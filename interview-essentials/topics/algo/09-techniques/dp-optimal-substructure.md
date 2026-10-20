---
id: technique-dp-optimal-substructure
kind: cloze
version: 2
level: 2
tags: [dynamic-programming]
requires:
  - technique-dp-overlapping-subproblems
elaborate: Say aloud the swap argument for one optimisation problem you know, and where it would break.
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Optimal_substructure
---

Fewest coins for 11 from {1, 5, 6, 9} is 5 + 6. Take 6 as its last
coin: the coins paying the remaining 5 must be the fewest that pay 5,
because swapping in a better way to pay 5 would beat the "optimal"
answer. A problem whose best answer always contains best answers to its
smaller pieces has {{c1::optimal substructure}}.

---

It lets DP try every last coin and trust each rest's best answer.
Without it, combining the best sub-answers can give a worse whole, and
DP has nothing to build on.
