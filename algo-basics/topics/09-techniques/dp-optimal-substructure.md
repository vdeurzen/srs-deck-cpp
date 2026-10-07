---
id: technique-dp-optimal-substructure
kind: cloze
version: 1
level: 2
tags: [dynamic-programming]
requires:
  - technique-dp-overlapping-subproblems
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Optimal_substructure
---

Fewest coins for 6 from {1, 3, 4} is 3 + 3. Its last coin is 3, so the
rest must itself be the fewest coins for {{c1::3}}; if a better way to
pay that rest existed, swapping it in would beat the "optimal" answer.
An optimum built from optima of its subproblems is called
{{c2::optimal substructure}}.

---

That is what licenses the recurrence
`best(a) = 1 + min over coins c of best(a − c)`: try every last coin,
trust the subproblem answers. For 6: 1 + min(best(5), best(3), best(2))
= 1 + min(2, 1, 2) = 2. Bellman called it the principle of optimality.
