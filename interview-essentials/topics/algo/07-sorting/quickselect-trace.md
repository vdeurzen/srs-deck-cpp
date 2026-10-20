---
id: sort-quickselect-trace
kind: trace
version: 2
level: 3
tags: [tracing, selection, quicksort]
probes:
  1: { lo: "3", "a[k]": "8" }
requires:
  - sort-quickselect-worked
elaborate: You need the median latency of a million requests. What does sorting cost you over this?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://en.wikipedia.org/wiki/Quickselect
---

Quickselect finds the k-th smallest (0-based) without sorting.
`lomuto(a, lo, hi)` partitions `a[lo..hi]` around the pivot `a[hi]` and
returns the pivot's final index. Round 1's result is given.

```cpp
int a[] = {2, 8, 1, 9, 3};
int k = 3, lo = 0, hi = 4;
while (true) {
  const int p = lomuto(a, lo, hi);   // round 1: a = 2 1 3 9 8, p = 2
  if (p == k) break;
  if (k < p) hi = p - 1;
  else lo = p + 1;
}
// @1
```

---

Round 1 puts pivot 3 at index 2 < k, so the answer lies right of it:
`lo` = 3. Round 2 partitions only `9 8` around 8, which lands at index
3 = k, so the loop stops with `lo` = 3 and `a[3]` = 8. The left side
`2 1` was never touched again: each round keeps one side.

(Values from running it under GCC 16.2.)
