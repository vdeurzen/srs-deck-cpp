---
id: rec-one-vs-two-sequences
kind: basic
version: 1
level: 4
tags: [dynamic-programming, strings, lis, recognition, lc-300, lc-1143]
requires:
  - dp-edit-distance-signal
  - dp-lis-patience-parsons
refs:
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://leetcode.com/problems/longest-common-subsequence/
  - https://doi.org/10.1145/321796.321811
elaborate: LC 1048 (longest string chain) has one list of words. Which of the two shapes is it, and what does its subproblem end at?
---

> (a) Return the length of the longest strictly increasing subsequence
> of `nums`.
>
> (b) Return the length of the longest common subsequence of `text1`
> and `text2`.

## One of them needs a subproblem with two indices. What about its input decides that?

---

**(b) walks two sequences that advance independently, so it needs a prefix of each.**

(b)'s subproblem is (first `i` of `text1`, first `j` of `text2`). (a)
walks one sequence: its O(n²) DP state, "LIS length ending at
`nums[i]`", fixes both where you are and the value the next pick must
beat, so one index is enough.
