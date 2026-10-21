---
id: sort-hoare-trace
kind: trace
version: 3
level: 2
tags: [tracing, sorting, quicksort, partition]
probes:
  1: { p: "2" }
requires:
  - sort-hoare-worked
  - interview-essentials/sort-lomuto-trace
  - cpp-essentials/iter-array-fixed-size
elaborate: Say in one sentence, as to an interviewer, what Hoare's split promises about the two parts, and what it does not promise about the pivot.
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
---

Hoare partition with pivot `a[lo]`. It returns `p`: no value in
`a[lo..p]` exceeds any value in `a[p+1..hi]`.

```cpp
int hoare(std::array<int, 5>& a, int lo, int hi) {
  const int pivot = a[lo];  int i = lo - 1, j = hi + 1;
  while (true) {
    ++i; while (a[i] < pivot) ++i;
    --j; while (a[j] > pivot) --j;
    if (i >= j) return j;
    std::swap(a[i], a[j]);
  }
}
std::array a{5, 2, 1, 7, 3};
int p = hoare(a, 0, 4);           // @1
```

---

`i` stops at once on the pivot 5 and `j` on 3: swap, `3 2 1 7 5`. Next
`i` stops on 7 and `j` on 1, left of it: crossed, so `p` = 2. Unlike
Lomuto, **the pivot is not in its final slot** (5 ended at index 4), so
recursion is on `[lo, p]`, not `[lo, p − 1]`. (Run with GCC 16.2.)
