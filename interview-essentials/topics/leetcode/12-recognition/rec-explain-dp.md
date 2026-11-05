---
id: rec-explain-dp
kind: explain
version: 3
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
- [ ] The statement asks for an optimum or a count over choices, where different choice sequences reach one remaining subproblem
- [ ] Set up the state as the least information that fixes the best rest of the answer
- [ ] For edit distance the state is `(i, j)`, a prefix length of each word
- [ ] Write the recurrence as a case split on the last decision: for edit distance, insert, delete or replace
- [ ] A statement asking to list every solution needs backtracking: DP counts or optimises, it doesn't enumerate
