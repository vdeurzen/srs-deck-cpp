---
id: arr-3sum-dedupe-worked
kind: basic
version: 1
level: 2
tags: [two-pointers, 3sum, worked-example, lc-15]
requires:
  - linear-two-pointers-sorted-pair
refs:
  - https://leetcode.com/problems/3sum/
---

3Sum: list every triplet summing to 0, no triplet twice. On the sorted
`a = {-2, 0, 0, 2, 2}`, the pair scan for the fixed `a[0] = -2`, with
`lo` and `hi` closing in from both ends:

```text
lo  hi  test                    action
1   4   -2 + 0 + 2 = 0          record {-2, 0, 2}; lo = 2, hi = 3
2   3   a[2] == a[1], both 0    skip: lo = 3
3   3   lo == hi                scan ends
```

## Why does `lo` move past index 2 without testing its sum?

---

**`a[2]` repeats the 0 just used, so its sum would record {-2, 0, 2} again.**

After a hit, `lo` keeps moving while `a[lo]` equals the value it just
left. Each recorded triplet then has a new middle value, so no triplet
is listed twice.
