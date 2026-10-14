---
id: dp-edit-distance-not-lcs
kind: basic
version: 1
level: 3
tags: [dynamic-programming, strings, edit-distance, misconception, lc-72, lc-583]
requires:
  - dp-edit-distance-code
refs:
  - https://leetcode.com/problems/edit-distance/
  - https://leetcode.com/problems/delete-operation-for-two-strings/
  - https://doi.org/10.1145/321796.321811
elaborate: Which of your string problems allows a replace, and which only allows deletions? Check the statement before choosing the formula.
---

LC 583 (make two words equal, deletions only) has the answer
`m + n − 2 · LCS`. A candidate reuses it for LC 72, where inserts,
deletes and replaces each cost 1.

## What does the formula return for `"abc"` → `"xbz"`?

---

**4, but LC 72's answer is 2: replace `a`→`x` and `c`→`z`.**

The LCS formula prices a mismatched pair as delete + insert, 2
operations. Edit distance can fix it with one replace: the diagonal
`d[i-1][j-1] + 1`. Equal only when no replace helps.
