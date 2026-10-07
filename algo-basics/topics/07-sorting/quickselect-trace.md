---
id: sort-quickselect-trace
kind: trace
version: 1
level: 3
tags: [tracing, selection, quicksort]
probes:
  1: { calls: "2", lo: "4", "a[k]": "7" }
requires:
  - sort-lomuto-trace
  - sort-quick-average
elaborate: You need the median latency of a million requests. What does sorting cost you over this?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://en.wikipedia.org/wiki/Quickselect
---

Quickselect finds the k-th smallest (0-based) without sorting.
`lomuto(a, lo, hi)` partitions with pivot `a[hi]` and returns the
pivot's final index.

```cpp
std::vector<int> a{7, 2, 9, 4, 1, 8, 5};
int k = 4, lo = 0, hi = 6, calls = 0;
while (true) {
  const int p = lomuto(a, lo, hi);
  ++calls;
  if (p == k) break;
  if (k < p) hi = p - 1;
  else lo = p + 1;
}
// @1
```

---

Pivot 5 lands at index 3 < k, so the answer is right of it: `lo` = 4.
Pivot 7 then lands at 4 = k. Only **one side** is ever followed, so the
expected cost is n + n/2 + n/4 + … ≈ 2n, Θ(n) on average; bad pivots
still give Θ(n²). `std::nth_element` is this idea. (Run with GCC 16.2.)
