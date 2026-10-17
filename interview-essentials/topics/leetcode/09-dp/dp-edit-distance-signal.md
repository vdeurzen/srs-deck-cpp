---
id: dp-edit-distance-signal
kind: basic
version: 1
level: 3
tags: [dynamic-programming, strings, edit-distance, recognition, lc-72]
requires:
  - technique-lcs-match
refs:
  - https://leetcode.com/problems/edit-distance/
  - https://doi.org/10.1145/321796.321811
elaborate: LC 97 asks whether `s3` interleaves `s1` and `s2`. What does subproblem `(i, j)` mean there, and which character of `s3` does it look at?
---

> Given two strings `word1` and `word2`, return the minimum number of
> operations required to convert `word1` to `word2`. You may insert a
> character, delete a character, or replace a character.

## What are the two indices of the subproblem you would tabulate?

---

**A prefix length of each word: `word1`'s first `i` characters against `word2`'s first `j`.**

Each operation settles the last character of one prefix or of both, so
`(i, j)` reads only `(i−1, j)`, `(i, j−1)` and `(i−1, j−1)`.
(m + 1)(n + 1) subproblems, O(mn). Two strings to align or transform:
a table over prefix pairs.
