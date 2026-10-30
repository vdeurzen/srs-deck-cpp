---
id: technique-explain-greedy
kind: explain
version: 2
level: 4
tags: [choosing, intervals]
requires:
  - technique-activity-selection
  - technique-greedy-vs-dp
  - sort-merge-idea
refs:
  - https://en.wikipedia.org/wiki/Activity_selection_problem
  - https://doi.org/10.1016/0304-3975(94)90061-2
elaborate: Say aloud what the earliest-end schedule costs to run, the sort plus the pass after it, and which part dominates.
---
An interviewer asks how you decide that a greedy algorithm is safe for
a problem, rather than something slower. Answer aloud.
---
- [ ] Greedy keeps each locally best choice for good and never revisits it, so one bad pick cannot be undone
- [ ] So it is safe only when that choice can be argued never to hurt, whatever is chosen after it
- [ ] For the most non-overlapping talks in one room, earliest end is safe: it leaves the most time for the rest
- [ ] Before trusting a rule, try small counterexamples: earliest start, on 0–10, 1–2, 3–4, loses both short talks
- [ ] When no rule survives, as with coins 4, 3, 1 paying 6, use DP, which tries every choice
