---
id: technique-exchange-argument
kind: cloze
version: 1
level: 3
tags: [greedy, proofs]
requires:
  - interview-essentials/technique-activity-selection
  - interview-essentials/technique-greedy-vs-dp
refs:
  - https://en.wikipedia.org/wiki/Activity_selection_problem#Proof_of_optimality
  - https://en.wikipedia.org/wiki/Greedy_algorithm
---

Why "earliest end first" is optimal: take any optimal schedule, let o be
its first talk and g the talk greedy picks first. Then end(g)
{{c1::≤}} end(o), so swapping o for g creates no {{c2::overlap}} with
the later talks and keeps the count: still optimal. Repeat on the talks
after g.

---

This is an **exchange argument**: turn any optimal answer into greedy's,
one swap at a time, never making it worse. It fails for coins {6, 5, 1},
amount 10: the optimum 5 + 5 does not contain greedy's first coin 6, and
no swap puts the 6 in without adding coins. No safe swap, no greedy: use
dynamic programming.
