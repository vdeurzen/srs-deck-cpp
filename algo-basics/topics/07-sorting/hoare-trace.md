---
id: sort-hoare-trace
kind: trace
version: 1
level: 2
tags: [tracing, sorting, quicksort, partition]
probes:
  1: { p: "2" }
requires:
  - sort-quick-idea
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
---

Hoare partition, pivot = the first element. It returns a split index
`p`: everything in `a[lo..p]` is ≤ everything in `a[p+1..hi]`.

```cpp
int hoare(std::array<int, 6>& a, int lo, int hi) {
  const int pivot = a[lo];
  int i = lo - 1, j = hi + 1;
  while (true) {
    do ++i; while (a[i] < pivot);
    do --j; while (a[j] > pivot);
    if (i >= j) return j;
    std::swap(a[i], a[j]);
  }
}
std::array a{5, 2, 9, 1, 7, 3};
int p = hoare(a, 0, 5);           // @1
```

---

Two indices close in from both ends, each stopping on an element that
belongs on the other side, and swap: (5, 3), then (9, 1). They cross at
`p` = 2, leaving `3 2 1 | 9 7 5`. Unlike Lomuto, **the pivot is not in
its final slot** (5 ended at index 5), so `a[p]` is not done yet:
recursion is on `[lo, p]`, not `[lo, p − 1]`. On six equal keys both
scans stop every time and meet in the middle: split at 2. (Run with GCC 16.2.)
