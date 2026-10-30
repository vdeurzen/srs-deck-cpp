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
elaborate: Say aloud a scheduling or allocation rule you have used that was greedy, and whether you could prove its choice was always safe.
---
An interviewer asks how you decide that a greedy algorithm is safe for
a problem, rather than something slower. Answer aloud.
---
- [ ] Greedy is safe when one local choice can be argued never to hurt, whatever is chosen after it
- [ ] For the most non-overlapping talks in one room, earliest end is safe: it leaves the most time for the rest
- [ ] Then sort by that key and take each compatible item: O(n log n) for the sort, O(n) after
- [ ] Before trusting a rule, try small counterexamples: earliest start, on 0–10, 1–2, 3–4, loses both short talks
- [ ] When no rule survives, as with coins 4, 3, 1 paying 6, use DP, which tries every choice
