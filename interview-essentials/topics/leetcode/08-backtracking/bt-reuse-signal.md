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
`for (int j = i; j < n; ++j)` that tries `c[j]` next. LC 40 says "each
number in candidates may only be used once in the combination", so the
recursive call starts from {{c1::j + 1::an index}}.

---

The start index decides what a subtree may still pick: `j + 1` moves
past the item just taken. LC 39's "the same number may be chosen an
unlimited number of times" recurses from `j` instead, keeping that item
available. Both only move forward, so no combination comes out twice in
a different order.
