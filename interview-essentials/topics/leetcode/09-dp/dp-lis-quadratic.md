---
id: dp-lis-quadratic
kind: basic
version: 1
level: 2
tags: [dynamic-programming, lis, lc-300]
requires:
  - technique-memo-vs-table
refs:
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://cp-algorithms.com/sequences/longest_increasing_subsequence.html
elaborate: Why is the answer the largest `dp[i]`, not `dp[n - 1]`?
---

## A subsequence keeps the order but may skip elements. `dp[i]` is the length of the longest strictly increasing subsequence ending at `a[i]`. For `a = [3, 1, 4, 2, 5]`, `dp` starts `[1, 1, 2, 2, …]`. What is `dp[4]`?

---

**3: `5` extends the best earlier entry with a smaller value: 1 + 2.**

`dp[i] = 1 + max dp[j]` over `j < i` with `a[j] < a[i]`, else 1. Here
4 and 2 both end runs of length 2 (1 2 5). The answer is the largest
`dp[i]`; each i scans all earlier j: O(n²).
