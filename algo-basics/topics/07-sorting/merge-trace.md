---
id: sort-merge-trace
kind: trace
version: 1
level: 2
tags: [tracing, sorting, merge-sort]
probes:
  1: { i: "3", j: "2", out: "1 2 3 4 7" }
  2: { out: "1 2 3 4 7 9" }
requires:
  - sort-merge-idea
refs:
  - https://en.cppreference.com/w/cpp/algorithm/merge
  - https://en.wikipedia.org/wiki/Merge_sort
---

The merge step of merge sort. Write `out` as space-separated values.

```cpp
std::vector<int> L{1, 4, 7}, R{2, 3, 9}, out;
std::size_t i = 0, j = 0;
while (i < L.size() && j < R.size())
  out.push_back(L[i] <= R[j] ? L[i++] : R[j++]);
// @1
out.insert(out.end(), L.begin() + i, L.end());
out.insert(out.end(), R.begin() + j, R.end());   // @2
```

---

Each step compares the two heads and takes the smaller, so every
comparison outputs one element: at most n − 1 comparisons, **Θ(n) per
merge**. The loop stops as soon as `L` runs out (`i == 3`); `R`'s tail,
9, is then copied without any comparison. (Run with GCC 16.2.)
