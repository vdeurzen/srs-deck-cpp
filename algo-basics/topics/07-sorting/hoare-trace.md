---
id: sort-hoare-trace
kind: trace
version: 2
level: 2
tags: [tracing, sorting, quicksort, partition]
probes:
  1: { p: "2", x: "5" }
requires:
  - sort-hoare-worked
  - interview-essentials/sort-lomuto-trace
  - cpp-essentials/iter-array-fixed-size
elaborate: Say in one sentence, as to an interviewer, what Hoare's split promises about the two parts, and what it does not promise about the pivot.
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
---

Hoare partition, pivot = the first element. It returns a split index
`p`: everything in `a[lo..p]` is ≤ everything in `a[p+1..hi]`.

```cpp
int hoare(std::array<int, 5>& a, int lo, int hi) {
  const int pivot = a[lo];
  int i = lo - 1, j = hi + 1;
  while (true) {
    ++i; while (a[i] < pivot) ++i;
    --j; while (a[j] > pivot) --j;
    if (i >= j) return j;
    std::swap(a[i], a[j]);
  }
}
std::array a{5, 2, 1, 7, 3};
int p = hoare(a, 0, 4);
int x = a[4];                     // @1
```

---

`i` stops at once on the pivot 5 itself and `j` on 3: swap, `3 2 1 7 5`.
Next `i` passes 2 and 1 and stops on 7; `j` stops on 1, left of it. They
have crossed, so `p` = 2: `3 2 1 | 7 5`. Unlike Lomuto, **the pivot is
not in its final slot** (5 ended at index 4), so recursion is on
`[lo, p]`, not `[lo, p − 1]`. (Run with GCC 16.2.)
