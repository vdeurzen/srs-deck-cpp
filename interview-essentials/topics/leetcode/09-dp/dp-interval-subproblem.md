---
id: dp-interval-subproblem
kind: basic
version: 1
level: 2
tags: [dynamic-programming, strings, lc-516]
requires:
  - technique-memo-vs-table
refs:
  - https://leetcode.com/problems/longest-palindromic-subsequence/
  - https://cp-algorithms.com/dynamic_programming/intro-to-dp.html
elaborate: Say in one sentence, as to an interviewer, in which order you would fill `d` so that every cell it reads is already final.
---

## Longest Palindromic Subsequence: the longest subsequence (order kept, characters skipped) of `s` that reads the same backwards. `d[i][j]` is that length for `s[i..j]`, both ends included. In `s = "abca"`, `s[0] == s[3]`. Which cell does `d[0][3]` build on?

---

**`d[1][2]`, plus 2: both matching ends wrap the best palindrome inside.**

`"bc"` gives 1, so `d[0][3]` = 3 (`"aba"`). On a mismatch, drop one end:
the larger of `d[i + 1][j]` and `d[i][j − 1]`. Each cell reads shorter
intervals, so fill by increasing length: n² cells, O(n²).
