---
id: sort-quick-worst
kind: trace
version: 1
level: 2
tags: [tracing, sorting, quicksort, complexity]
probes:
  1: { sorted: "21" }
  2: { reversed: "21" }
  3: { mixed: "10" }
requires:
  - sort-lomuto-trace
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Worst-case_analysis
  - https://doi.org/10.1093/comjnl/5.1.10
---

`lomuto(a, lo, hi)` is the Lomuto partition (pivot `a[hi]`, returns
its final index) and adds its `hi - lo` comparisons to `cmp`.

```cpp
int cmp = 0;
void quicksort(std::vector<int>& a, int lo, int hi) {
  if (lo >= hi) return;
  const int p = lomuto(a, lo, hi);
  quicksort(a, lo, p - 1);
  quicksort(a, p + 1, hi);
}
std::vector<int> s{1, 2, 3, 4, 5, 6, 7};
std::vector<int> r{7, 6, 5, 4, 3, 2, 1};
std::vector<int> m{3, 1, 6, 2, 7, 5, 4};
quicksort(s, 0, 6); int sorted = cmp;   cmp = 0;   // @1
quicksort(r, 0, 6); int reversed = cmp; cmp = 0;   // @2
quicksort(m, 0, 6); int mixed = cmp;               // @3
```

---

On sorted input the last element is the maximum, so each partition
peels off one element: 6 + 5 + … + 1 = n(n − 1)/2 = 21, recursion n
deep. **Worst case Θ(n²)**. Reversed input degenerates the same way. In
`m` the pivot 4 is the median, splitting 3 | 3: 6 + 2 + 2 = 10, the
n log n shape. (Run with GCC 16.2.)
