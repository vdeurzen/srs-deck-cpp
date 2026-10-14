---
id: bt-reuse-signal
kind: cloze
version: 1
level: 3
tags: [backtracking, combinations, recognition, lc-39, lc-40]
requires:
  - bt-combination-start-index
refs:
  - https://leetcode.com/problems/combination-sum/
  - https://leetcode.com/problems/combination-sum-ii/
  - https://doi.org/10.1145/321296.321300
elaborate: LC 216 (combination sum III) picks digits 1–9, "each number is used at most once". Which start index, and what plays the role of the sorted candidates?
---

One template, sorted input `c`, and a loop
`for (int j = i; j < n; ++j)` that tries `c[j]` next. The statement
decides where the recursive call starts:

- LC 39, "the same number may be chosen from candidates an unlimited
  number of times": recurse from {{c1::j::an index}}.
- LC 40, "each number in candidates may only be used once in the
  combination": recurse from {{c2::j + 1::an index}}.

---

The start index decides what a subtree may still pick: `j` keeps the
item just taken available, `j + 1` moves past it. Both only ever move
forward, so no combination comes out twice in a different order.
