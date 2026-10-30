---
id: bt-reuse-signal
kind: cloze
version: 1
level: 3
tags: [recognition, lc-39, lc-40, lc-377]
requires:
  - bt-combination-start-index
  - bt-permutations-parsons
refs:
  - https://leetcode.com/problems/combination-sum/
  - https://leetcode.com/problems/combination-sum-ii/
  - https://leetcode.com/problems/combination-sum-iv/
  - https://leetcode.com/problems/permutations/
  - https://doi.org/10.1145/321296.321300
elaborate: Combination Sum IV (LC 377) only asks how many such ordered sequences there are, for a target up to 1000. Why would you count them with a table indexed by the amount left instead of listing them?
---

Distinct values `c`, reusable any number of times. Each call loops
`for (int j = start; j < n; ++j)`: it appends `c[j]`, recurses, then
removes it. To list every *ordered* sequence that sums to `target`,
where [1, 2] and [2, 1] both count, every recursive call passes as
`start` {{c1::0::an index}}.

---

When order matters, every position may hold any value again, so each
call restarts the loop at index 0. A start index that only moves
forward (`j`, `j + 1`) lists each combination once, in increasing index
order, so [2, 1] would never appear.
