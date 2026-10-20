---
id: linear-two-pointers-worked
kind: basic
version: 1
level: 2
tags: [two-pointers, arrays, worked-example]
requires:
  - linear-two-pointers-sorted-pair
refs:
  - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
---

## A pair summing to 13 in the sorted `{1, 3, 4, 6, 9, 11}`, `lo` from the left, `hi` from the right:

| lo, hi | `a[lo] + a[hi]` | compare | move |
| --- | --- | --- | --- |
| 0, 5 | 1 + 11 = 12 | < 13 | `++lo` |
| 1, 5 | 3 + 11 = 14 | > 13 | `--hi` |
| 1, 4 | 3 + 9 = 12 | < 13 | `++lo` |
| 2, 4 | 4 + 9 = 13 | = 13 | found |

Why does the second row move `hi`, not `lo`?

---

**14 is too big, and 3 is the smallest partner 11 has left.**

Every element still between the pointers is ≥ 3, so any pair with 11
sums to at least 14: 11 can be discarded for good. Each step is
compare, then move the end that cannot be in the pair.
