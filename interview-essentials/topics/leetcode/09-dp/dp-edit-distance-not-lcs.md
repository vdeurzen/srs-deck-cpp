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

Delete Operation for Two Strings (LC 583), the fewest single-character
deletions from either word that make two words equal, has the answer
`m + n − 2 · LCS`, where LCS is the length of the longest common
subsequence of the two words. A candidate reuses it for Edit Distance (LC 72),
where inserts, deletes and replaces each cost 1.

## What does the formula return for `"abc"` → `"xbz"`?

---

**4, but the edit distance is 2: replace `a`→`x` and `c`→`z`.**

The LCS formula prices a mismatched pair as delete + insert, 2
operations. Edit distance can fix it with one replace: the diagonal
`d[i-1][j-1] + 1`. Equal only when no replace helps.
