---
id: sort-quicksort-recurse-code
kind: code
version: 1
level: 2
tags: [foundations, sorting, quicksort, recursion]
input: chips
choices:
  c1:
    - "quick_sort(a, lo, p - 1); quick_sort(a, p + 1, hi);"
    - "quick_sort(a, lo, p); quick_sort(a, p + 1, hi);"
    - "quick_sort(a, lo, p - 1); quick_sort(a, p, hi);"
    - "quick_sort(a, lo, p); quick_sort(a, p, hi);"
compile:
  harness: |
    constexpr int place_pivot(Arr& a, int lo, int hi) {
      int s = lo;
      for (int i = lo; i < hi; ++i)
        if (a[i] < a[hi]) std::swap(a[s++], a[i]);
      std::swap(a[s], a[hi]);
      return s;
    }
    constexpr Arr sorted(Arr a) { quick_sort(a, 0, 5); return a; }
    static_assert(sorted({1, 2, 3, 4, 5, 6}) == Arr{1, 2, 3, 4, 5, 6});
    static_assert(sorted({6, 5, 4, 3, 2, 1}) == Arr{1, 2, 3, 4, 5, 6});
    static_assert(sorted({4, 1, 6, 2, 5, 3}) == Arr{1, 2, 3, 4, 5, 6});
    static_assert(sorted({2, 2, 2, 2, 2, 2}) == Arr{2, 2, 2, 2, 2, 2});
    int main() {}
requires:
  - sort-partition-regions
  - interview-essentials/sort-quick-idea
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://algs4.cs.princeton.edu/23quicksort/
---

`quick_sort(a, lo, hi)` sorts `a[lo..hi]`, both ends included.
`place_pivot` partitions that range around `a[hi]` and returns the
pivot's index `p`. Complete the recursion.

```cpp
#include <array>
#include <utility>
using Arr = std::array<int, 6>;
constexpr int place_pivot(Arr& a, int lo, int hi);
constexpr void quick_sort(Arr& a, int lo, int hi) {
  if (lo >= hi) return;
  const int p = place_pivot(a, lo, hi);
  {{c1::quick_sort(a, lo, p - 1); quick_sort(a, p + 1, hi);}}
}
```

---

The pivot at `p` is already in its sorted slot, so both calls leave it
out. That is also what guarantees progress: each call is at least one
element smaller. Including `p` lets a range recurse on itself unchanged
(sorted input gives `p == hi`; all-equal keys give `p == lo`), and the
recursion never ends.
No merge after the calls: partition did the work up front.
