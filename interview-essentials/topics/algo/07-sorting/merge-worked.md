---
id: sort-merge-worked
kind: basic
version: 1
level: 1
tags: [sorting, merge-sort, worked-example]
requires:
  - sort-sorted-postcondition
refs:
  - https://algs4.cs.princeton.edu/22mergesort/
  - https://en.cppreference.com/w/cpp/algorithm/merge
---

## Merging two sorted runs, `L = 2 7` and `R = 4 5`: compare the two front values, move the smaller to `out`, repeat; when one run is empty, copy the other.

```
compare   take   out        L left   R left
2 vs 4    2      2          7        4 5
7 vs 4    4      2 4        7        5
7 vs 5    5      2 4 5      7        —
R empty   7      2 4 5 7    —        —
```

Why may the last row copy the 7 without comparing it with anything?

---

**R is empty and L is sorted, so L's rest is already the correct tail.**

Each step took the smaller front, so everything in `out` is ≤ every
value still waiting. With R used up, the values left are L's, already in
order: copying them needs no comparison.
