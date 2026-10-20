---
id: sort-merge-runs-trace
kind: trace
version: 2
level: 1
tags: [foundations, tracing, sorting, merge-sort]
probes:
  1: { i: "1", j: "2" }
  2: { "out[2]": "4", "out[3]": "8" }
requires:
  - sort-merge-worked
  - cpp-essentials/vector-basics
  - cpp-essentials/expr-increment-value
refs:
  - https://algs4.cs.princeton.edu/22mergesort/
  - https://en.cppreference.com/w/cpp/algorithm/merge
elaborate: Where else do you combine two already-sorted streams, such as log files or query results, and what does this loop save you there?
---

Both `L` and `R` are sorted.

```cpp
std::vector<int> L{3, 8};
std::vector<int> R{1, 4};
std::vector<int> out;
int i = 0;
int j = 0;
while (i < 2 && j < 2) {
  if (L[i] <= R[j]) { out.push_back(L[i]); ++i; }
  else              { out.push_back(R[j]); ++j; }
}                                                // @1
while (i < 2) { out.push_back(L[i]); ++i; }
while (j < 2) { out.push_back(R[j]); ++j; }     // @2
```

---

1 < 3 takes R's 1, 3 < 4 takes L's 3, then 8 > 4 takes R's 4: `R` is
empty after three comparisons, so the loop stops with `i` = 1, `j` = 2.
L's 8 is copied with no comparison: `out` = `1 3 4 8`.

(Values from running it under GCC 16.2.)
