---
id: rec-explain-dp
kind: explain
version: 2
level: 4
tags: [recognition, lc-72, lc-518, lc-39]
requires:
  - dp-edit-distance-signal
  - dp-edit-distance-code
  - rec-one-vs-two-sequences
  - rec-dp-cell-vs-mask
  - rec-list-vs-count
refs:
  - https://leetcode.com/problems/edit-distance/
  - https://leetcode.com/problems/coin-change-ii/
  - https://leetcode.com/problems/combination-sum/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: Take a DP you have written. Could its state drop one dimension by keeping only the previous row, and what would you lose?
---
An interviewer asks how you recognise a dynamic-programming problem
and set it up. Answer aloud.
---
- [ ] Cue: an optimum or a count over choices, where different choice orders reach the same subproblem
- [ ] Pattern: the state is the least information that fixes the best rest of the answer
- [ ] Example: edit distance, state `(i, j)`, a prefix length of each word
- [ ] Cost: number of states times work per state; edit distance is O(mn)
- [ ] Look-alike: listing every solution instead of counting them needs backtracking, since the output itself is exponential
