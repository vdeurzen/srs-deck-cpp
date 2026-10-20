---
id: bt-reuse-signal
kind: cloze
version: 1
level: 3
tags: [recognition, lc-39, lc-40, lc-377]
requires:
  - technique-backtracking-state-space
refs:
  - https://leetcode.com/problems/combination-sum/
  - https://leetcode.com/problems/combination-sum-ii/
  - https://leetcode.com/problems/combination-sum-iv/
  - https://leetcode.com/problems/permutations/
  - https://doi.org/10.1145/321296.321300
elaborate: Permutations (LC 46) lists every ordering of distinct `nums`, each used exactly once. Why is a fixed start index no longer enough on its own, and what must the recursion track instead?
---

One template, sorted distinct values `c`, and a loop
`for (int j = i; j < n; ++j)` that tries `c[j]` next. Listing
combinations that sum to `target` with unlimited reuse recurses from
`j`; with each value used at most once, from `j + 1`. Listing every
*ordered* sequence that sums to `target`, with reuse, where [1, 2] and
[2, 1] both count, recurses from {{c1::0::an index}}.

---

The start index decides what a subtree may still pick. `j` and `j + 1`
only move forward, so each combination comes out once, in increasing
index order. When order matters, every position may hold any value
again, so each call restarts the loop at 0.
