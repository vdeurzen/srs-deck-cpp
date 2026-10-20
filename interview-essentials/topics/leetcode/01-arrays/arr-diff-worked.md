---
id: arr-diff-worked
kind: basic
version: 1
level: 2
tags: [difference-array, prefix-sums, worked-example, lc-370]
requires:
  - arr-diff-signal
refs:
  - https://leetcode.com/problems/range-addition/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
---

Start from `n = 5` zeros; update `[l, r, v]` adds `v` to every index
`l..r` (0-based, inclusive). `d` has `n + 1` cells. Each update is
marked in O(1), then one running sum turns `d` into the answer.

```text
step                d[0] .. d[5]
init                0   0    0    0   0   0
mark [0, 1] +10     10  0   −10   0   0   0
mark [1, 2] +20     10  20  −10  −20  0   0
integrate           10  30   20   0   0   (spare)
```

## Why does the −20 sit at index 3?

---

**Index 3 is the first one past `[1, 2]`, so the running sum stops adding 20 there.**

The `+20` at `l` starts the update for every later index; the `−20` at
`r + 1` cancels it from there on. The spare cell catches `r + 1` when
`r` is the last index.
