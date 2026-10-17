---
id: sort-merge-sort-split-code
kind: code
version: 1
level: 2
tags: [foundations, sorting, merge-sort, recursion]
input: chips
choices:
  c1:
    - "merge_sort(a, mid, hi);"
    - "merge_sort(a, mid + 1, hi);"
    - "merge_sort(a, lo, hi);"
    - "merge_sort(a, mid, hi - 1);"
compile:
  harness: |
    constexpr void merge_runs(Arr& a, int lo, int mid, int hi) {
      Arr t{};
      std::merge(a.begin() + lo, a.begin() + mid, a.begin() + mid, a.begin() + hi, t.begin());
      std::copy(t.begin(), t.begin() + (hi - lo), a.begin() + lo);
    }
    constexpr Arr sorted(Arr a) { merge_sort(a, 0, 6); return a; }
    static_assert(sorted({6, 5, 4, 3, 2, 1}) == Arr{1, 2, 3, 4, 5, 6});
    static_assert(sorted({3, 6, 1, 5, 2, 4}) == Arr{1, 2, 3, 4, 5, 6});
    int main() {}
requires:
  - sort-merge-runs-trace
  - interview-essentials/sort-merge-idea
refs:
  - https://algs4.cs.princeton.edu/22mergesort/
  - https://en.wikipedia.org/wiki/Merge_sort
---

`merge_sort(a, lo, hi)` sorts `a[lo, hi)`, `hi` excluded.
`merge_runs` merges two adjacent sorted runs. Complete the second
recursive call.

```cpp
#include <algorithm>
#include <array>
using Arr = std::array<int, 6>;
constexpr void merge_runs(Arr& a, int lo, int mid, int hi);
constexpr void merge_sort(Arr& a, int lo, int hi) {
  if (hi - lo < 2) return;
  const int mid = lo + (hi - lo) / 2;
  merge_sort(a, lo, mid);
  {{c1::merge_sort(a, mid, hi);}}
  merge_runs(a, lo, mid, hi);
}
```

---

Split by position, sort each half, merge. With half-open ranges the
halves are `[lo, mid)` and `[mid, hi)`: `mid` belongs to the right.
`mid + 1` leaves `a[mid]` unsorted inside a run; `hi − 1` the last;
`[lo, hi)` never shrinks, so the recursion never ends. Depth ⌈log₂ n⌉,
Θ(n) merging per level: Θ(n log n).
