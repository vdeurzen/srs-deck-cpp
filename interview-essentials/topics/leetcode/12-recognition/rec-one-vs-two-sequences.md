---
id: rec-one-vs-two-sequences
kind: basic
version: 1
level: 4
tags: [strings, recognition, lc-300, lc-1143, lc-516]
requires:
  - dp-edit-distance-signal
  - dp-lis-quadratic
refs:
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://leetcode.com/problems/longest-common-subsequence/
  - https://leetcode.com/problems/longest-palindromic-subsequence/
  - https://leetcode.com/problems/longest-string-chain/
  - https://doi.org/10.1145/321796.321811
elaborate: Longest String Chain (LC 1048) asks for the longest chain of `words` where each word is the previous one with one letter inserted; it has one list of words. Which shape is it, and where does its subproblem end?
---

> (a) Return the length of the longest strictly increasing subsequence
> of `nums`.
>
> (b) Return the length of the longest common subsequence of `text1`
> and `text2`.
>
> (c) Return the length of the longest subsequence of `s` that reads
> the same backwards.

## Two of them need a subproblem with two indices. What about the subproblem decides that?

---

**It is bounded at two places that move independently, whether in one input or two.**

(b): the first `i` of `text1` and the first `j` of `text2`. (c), one
string: the interval `s[i..j]`, shrunk from either end. (a): "LIS
ending at `nums[i]`" fixes both the position and the value to beat, so
one index is enough.
