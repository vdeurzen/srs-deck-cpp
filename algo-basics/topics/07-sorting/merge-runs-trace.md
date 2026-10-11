---
id: sort-merge-runs-trace
kind: trace
version: 1
level: 1
tags: [foundations, tracing, sorting, merge-sort]
probes:
  1: { i: "1", k: "5", c: "5" }
  2: { out: "1 3 4 5 6 8 9" }
requires:
  - sort-sorted-postcondition
refs:
  - https://algs4.cs.princeton.edu/22mergesort/
  - https://en.cppreference.com/w/cpp/algorithm/merge
---

Both `L` and `R` are sorted. `c` counts comparisons. Write `out` as
space-separated values.

```cpp
std::array<int, 3> L{3, 8, 9};
std::array<int, 4> R{1, 4, 5, 6};
std::array<int, 7> out{};
std::size_t i = 0, j = 0, k = 0;
int c = 0;
while (i < 3 && j < 4) {
  ++c;
  out[k++] = L[i] <= R[j] ? L[i++] : R[j++];
}                                       // @1
while (i < 3) out[k++] = L[i++];
while (j < 4) out[k++] = R[j++];        // @2
```

---

Each comparison sends exactly one value to `out`, so the loop ends when
`R` runs dry after 5 steps; `L`'s tail `8 9` is copied with no
comparison. **Merging n values takes ≤ n − 1 comparisons: Θ(n).** The
precondition matters: if a run is unsorted, so is `out`.
(Run with GCC 16.2.)
