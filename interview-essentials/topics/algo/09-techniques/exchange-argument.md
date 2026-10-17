---
id: technique-exchange-argument
kind: cloze
version: 1
level: 3
tags: [greedy, proofs]
requires:
  - technique-activity-selection
  - technique-greedy-vs-dp
refs:
  - https://en.wikipedia.org/wiki/Activity_selection_problem#Proof_of_optimality
  - https://en.wikipedia.org/wiki/Greedy_algorithm
---

Why "earliest end first" is optimal: take any optimal schedule and let g
be the talk greedy picks first. The optimal schedule's first talk ends
{{c1::no earlier than g::compare the end times}}, so replacing it with g
creates no conflict and keeps {{c2::the same number of talks}}: still
optimal. Repeat on the talks after g.

---

This is an **exchange argument**: turn any optimal answer into greedy's,
one swap at a time, never making it worse. It fails for coins {6, 5, 1},
amount 10: the optimum 5 + 5 does not contain greedy's first coin 6, and
no swap puts the 6 in without adding coins. No safe swap, no greedy: use
dynamic programming.
