---
id: technique-rec-fewest-arrows
kind: basic
version: 1
level: 3
tags: [recognition, intervals]
requires:
  - technique-activity-selection
  - technique-greedy-vs-dp
  - arr-intervals-merge-meet
elaborate: Say aloud, as to an interviewer, why moving any optimal first arrow right to the earliest end never bursts fewer balloons.
refs:
  - https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
  - https://en.wikipedia.org/wiki/Activity_selection_problem
---

## n ≤ 10⁵ balloons are intervals `[start, end]` on a line; an arrow shot at `x` bursts every balloon with start ≤ x ≤ end. Return the fewest arrows that burst them all. Which technique fits?

---

**Greedy: sort by end, shoot at the earliest end, skip every balloon it bursts.**

Some arrow must hit the earliest-ending balloon; at its end it hits as
many others as anywhere. Merging overlaps looks alike but fails:
[1, 6], [2, 8], [7, 12] merge into one yet need two arrows.
(Minimum Number of Arrows to Burst Balloons, LC 452.)
