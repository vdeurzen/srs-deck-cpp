---
id: technique-explain-greedy
kind: explain
version: 1
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
- [ ] Cue: one local choice can be argued always safe, like taking the talk that frees the room soonest
- [ ] Pattern: sort by the deciding key, then take each item compatible with the ones already taken
- [ ] Example: most non-overlapping talks in one room, taken in order of earliest end
- [ ] Complexity: the sort costs O(n log n), and the pass after it is O(n)
- [ ] Look-alike: coins 4, 3, 1: largest-first pays 6 with three coins, where DP's try-every-choice finds two
