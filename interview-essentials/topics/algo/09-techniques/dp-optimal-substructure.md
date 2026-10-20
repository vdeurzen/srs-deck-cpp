---
id: technique-dp-optimal-substructure
kind: cloze
version: 1
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
coin: the rest must itself be the fewest coins for {{c1::5}}; if a better way to
pay that rest existed, swapping it in would beat the "optimal" answer.
An optimum built from optima of its subproblems is called
{{c2::optimal substructure}}.

---

It lets DP try every last coin and trust each rest's best answer.
Without it, combining the best sub-answers can give a worse whole, and
DP has nothing to build on.
