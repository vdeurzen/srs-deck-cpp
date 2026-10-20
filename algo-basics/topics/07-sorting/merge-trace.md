---
id: sort-merge-trace
kind: trace
version: 2
level: 2
tags: [tracing, sorting, merge-sort]
probes:
  1: { n: "4", j: "2" }
requires:
  - interview-essentials/sort-merge-idea
  - interview-essentials/sort-merge-worked
  - cpp-essentials/types-size-t
elaborate: Say in one sentence, as to an interviewer, why merging n elements never takes more than n − 1 comparisons.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/merge
  - https://en.wikipedia.org/wiki/Merge_sort
---

The merge step of merge sort. Both inputs are sorted.

```cpp
std::vector<int> L{1, 6}, R{3, 4, 8}, out;
std::size_t i = 0, j = 0;
while (i < L.size() && j < R.size()) {
  if (L[i] <= R[j]) { out.push_back(L[i]); ++i; }
  else              { out.push_back(R[j]); ++j; }
}
std::size_t n = out.size();                    // @1
while (i < L.size()) { out.push_back(L[i]); ++i; }
while (j < R.size()) { out.push_back(R[j]); ++j; }
```

---

Each pass of the first loop makes one comparison and outputs one
element: 1, 3, 4, then 6 against 8. Taking the 6 empties `L`, so the
loop stops after **4 comparisons** with `j` = 2. R's last value, 8, is
copied with no comparison: 5 elements, 4 comparisons, Θ(n) per merge.
(Run with GCC 16.2.)
