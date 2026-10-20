---
id: sort-quickselect-worked
kind: basic
version: 2
level: 2
tags: [selection, quicksort, worked-example]
requires:
  - sort-lomuto-worked
refs:
  - https://en.wikipedia.org/wiki/Quickselect
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
---

## Quickselect finds the k-th smallest (0-based) by partitioning and keeping only the side that holds index k. Here k = 0 on `5 2 8`.

```cpp
while (true) {
  const int p = lomuto(a, lo, hi);   // pivot a[hi]; returns its final index
  if (p == k) break;
  if (k < p) hi = p - 1; else lo = p + 1;
}
```

```
lo hi  pivot  after partition  p   next
0  2   8      5 2 8            2   k < p: hi = 1
0  1   2      2 5 8            0   p == k: answer 2
```

Why may round 1 drop slot 2 for good?

---

**The 8 is in its final sorted slot, 2, and index 0 lies to its left.**

Partition leaves only smaller values left of the pivot, so the 0-th
smallest must be among them; nothing right of it can ever move back.
Each round keeps one side, so the work is about n + n/2 + … ≈ 2n.
