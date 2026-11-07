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
- [ ] Greedy is safe only when the choice can be argued never to hurt, whatever is chosen after it
- [ ] Earliest end is safe for the most non-overlapping talks in one room: it leaves the most time for the rest
- [ ] Try small counterexamples before trusting a rule: earliest start, on 0–10, 1–2, 3–4, loses both short talks
