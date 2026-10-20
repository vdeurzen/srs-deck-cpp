---
id: arr-kadane-worked
kind: basic
version: 1
level: 2
tags: [arrays, dynamic-programming, worked-example, lc-53]
requires:
  - technique-loop-invariant-sum
  - stl-min-max
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://doi.org/10.1145/358234.381162
---

Maximum Subarray: the largest sum of a non-empty contiguous run of
`nums`. One pass keeps `cur`, the best sum of a run *ending at* `x`,
and `best`, the largest `cur` so far. `cur` starts at 0.

```text
x    cur = max(x, cur + x)    best
2    max(2, 2)   = 2          2
-3   max(-3, -1) = -1         2
4    max(4, 3)   = 4          4
-1   max(-1, 3)  = 3          4
2    max(2, 5)   = 5          5
```

## At `x = 4`, why does `cur` restart at 4 instead of extending to 3?

---

**The best run ending just before 4 sums to −1, and adding it only lowers 4.**

A run ending at `x` either extends the best run ending one step
earlier or starts fresh at `x`; `max` picks the larger. A negative
prefix is never worth keeping. The answer 5 is the run 4, −1, 2.
