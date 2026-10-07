---
id: sort-insertion-cases
kind: trace
version: 1
level: 2
tags: [tracing, sorting, insertion-sort, complexity]
probes:
  1: { sorted: "4" }
  2: { reversed: "10" }
  3: { nearly: "5" }
requires:
  - sort-insertion-trace
  - complexity-best-worst-linear-search
elaborate: Where in a larger sort would you deliberately run insertion sort, given this best case?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Insertion_sort
---

`comparisons(a)` insertion-sorts a copy of `a` and counts every
evaluation of `a[j - 1] > key`.

```cpp
auto comparisons = [](std::array<int, 5> a) {
  int c = 0;
  for (std::size_t i = 1; i < a.size(); ++i) {
    const int key = a[i];
    std::size_t j = i;
    while (j > 0 && (++c, a[j - 1] > key)) { a[j] = a[j - 1]; --j; }
    a[j] = key;
  }
  return c;
};
int sorted   = comparisons({1, 2, 3, 4, 5});   // @1
int reversed = comparisons({5, 4, 3, 2, 1});   // @2
int nearly   = comparisons({1, 2, 4, 3, 5});   // @3
```

---

A comparison either shifts (fixing one inversion) or ends that
insertion, so the count is at most inversions + (n − 1).
**Best case, sorted: 0 inversions, n − 1 = 4, Θ(n).** **Worst,
reversed: every pair inverted, n(n − 1)/2 = 10, Θ(n²).** One swapped
pair costs one extra: 5. Random input averages n(n − 1)/4 inversions,
so Θ(n²) on average. (Run with GCC 16.2.)
