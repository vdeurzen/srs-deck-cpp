---
id: rq-segment-query-worked
kind: basic
version: 1
level: 3
tags: [segment-tree, range-queries, worked-example]
requires:
  - rq-segment-signal
refs:
  - https://codeforces.com/blog/entry/18051
---

A bottom-up segment tree over `a = {3, 1, 4, 2}`: leaves `t[4..8)` hold
`a`, and `t[v] = t[2v] + t[2v + 1]`, so `t[2] = 4` covers `a[0..2)` and
`t[3] = 6` covers `a[2..4)`. The query sums `a[1..4)`: `l = 1 + 4`,
`r = 4 + 4`, and each level takes a node at an odd end, then halves both.

```
l  r  if l is odd          if r is odd  s after
5  8  take t[5] (a[1])     even         1
3  4  take t[3] (a[2..4))  even         7
2  2  l == r: stop         —            7
```

## Row 1: why is leaf 5 taken on its own instead of through its parent?

---

**An odd node is a right child: its parent `t[2]` also covers `a[0]`.**

`a[0]` is outside the range, so the parent would overcount. Taking the
odd end alone and stepping past it leaves an even `l`, whose parent
lies wholly inside, so the next level takes `t[3]` whole.
