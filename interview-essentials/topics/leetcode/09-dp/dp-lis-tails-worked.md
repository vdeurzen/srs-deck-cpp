---
id: dp-lis-tails-worked
kind: basic
version: 1
level: 2
tags: [dynamic-programming, binary-search, worked-example, lc-300]
requires:
  - dp-lis-quadratic
  - search-lower-bound-meaning
refs:
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://cp-algorithms.com/sequences/longest_increasing_subsequence.html
---

## Longest strictly increasing subsequence of `{3, 4, 1, 5}`, kept as a sorted list `t`: `t[k]` is the smallest value that ends an increasing subsequence of length k + 1. Each `x` looks up the first tail ≥ x with `std::lower_bound`.

| x | lookup | `t` after |
| --- | --- | --- |
| 3 | none: append | 3 |
| 4 | none: append | 3 4 |
| 1 | 3: overwrite it | 1 4 |
| 5 | none: append | 1 4 5 |

The answer is `t.size()`, 3. Why does 1 overwrite 3 instead of being appended?

---

**1 is below every tail, so it ends only a length-1 subsequence, lower than 3.**

Appending would claim a run of length 3 ending in 1. Overwriting keeps
`t[0]` the smallest possible end, which is easier to extend: a later 2
could follow 1 but not 3. `t` stays sorted, so lookups stay binary
searches.
