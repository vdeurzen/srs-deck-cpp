---
id: technique-lcs-worked
kind: basic
version: 1
level: 2
tags: [dynamic-programming, strings, worked-example]
requires:
  - technique-coin-change-worked
  - stl-min-max
refs:
  - https://doi.org/10.1145/321796.321811
  - https://en.wikipedia.org/wiki/Longest_common_subsequence
---

A subsequence keeps characters in order but not necessarily adjacent.
`dp[i][j]` is the length of the longest common subsequence of the first
`i` characters of "AB" and the first `j` of "BA"; row or column 0 is
the empty prefix, all 0.

| cell | compares | last characters | value |
| --- | --- | --- | --- |
| dp[1][1] | A vs B | differ: max(0, 0) | 0 |
| dp[1][2] | A vs BA | match: dp[0][1] + 1 | 1 |
| dp[2][1] | AB vs B | match: dp[1][0] + 1 | 1 |
| dp[2][2] | AB vs BA | differ: max(1, 1) | 1 |

## Why does `dp[2][2]` take max(1, 1) and add nothing, though A and B each appear in both strings?

---

**Its last characters, B and A, differ, so at most one of them can end a common subsequence.**

Order matters: "AB" and "BA" share "A" or "B", never both. So drop the
last character of one string or the other, and keep the better of the
two cells already filled.
