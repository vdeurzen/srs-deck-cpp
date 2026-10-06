---
id: sort-quickselect
kind: code
version: 1
level: 4
tags: [selection, sorting, invariants]
input: chips
choices:
  c1: ["lo = p + 1;", "hi = p;", "hi = p + 1;", "lo = k;"]
compile:
  harness: |
    constexpr std::array<int, 8> kData{5, 3, 9, 1, 7, 2, 8, 6};
    static_assert(quickselect(kData, 0) == 1);
    static_assert(quickselect(kData, 1) == 2);
    static_assert(quickselect(kData, 2) == 3);
    static_assert(quickselect(kData, 3) == 5);
    static_assert(quickselect(kData, 4) == 6);
    static_assert(quickselect(kData, 5) == 7);
    static_assert(quickselect(kData, 6) == 8);
    static_assert(quickselect(kData, 7) == 9);
    int main() {}
requires:
  - sort-introsort
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://en.wikipedia.org/wiki/Quickselect
---

Quickselect is quicksort that recurses into **one** side. Complete the
step taken when the target is to the right of the pivot.

```cpp
#include <array>
#include <cstddef>
#include <utility>

constexpr std::size_t partition(std::array<int, 8>& a, std::size_t lo,
                                std::size_t hi) {           // pivot is a[hi]
  const int pivot = a[hi];
  std::size_t store = lo;
  for (std::size_t i = lo; i < hi; ++i)
    if (a[i] < pivot) { std::swap(a[i], a[store]); ++store; }
  std::swap(a[store], a[hi]);
  return store;
}

constexpr int quickselect(std::array<int, 8> a, std::size_t k) {
  std::size_t lo = 0, hi = a.size() - 1;
  while (lo < hi) {
    const std::size_t p = partition(a, lo, hi);
    if (k == p) return a[p];
    if (k < p) hi = p - 1;
    else {{c1::lo = p + 1;}}
  }
  return a[lo];
}
```

---

After partitioning, the pivot is **in its final sorted position** `p`:
everything before it is smaller, everything after is larger. So if
`k == p` you are done, and otherwise the answer is entirely on one
side — there is no reason to touch the other. That is the whole
difference from quicksort, and it turns the recurrence
`T(n) = 2T(n/2) + n` into `T(n) = T(n/2) + n`, whose sum is a geometric
series: **expected Θ(n)**, not Θ(n log n).

Moving `lo` past the pivot rather than onto it matters twice: it
excludes an element already known not to be the answer, and it
guarantees the range shrinks every iteration — the termination
argument. Moving `hi` instead throws away the half the answer is in,
and the loop happily returns a neighbouring element: a wrong answer,
not a crash, which is why the harness pins every `k` rather than a
couple of convenient ones.

Worst case is still Θ(n²) with adversarial pivots. The fixes are the
same as quicksort's: median-of-three or ninther pivot selection,
randomisation, and — for a hard guarantee — median-of-medians, which
picks a provably good pivot in O(n) and makes the whole algorithm
worst-case linear at a constant factor nobody wants to pay.

The library version, `std::nth_element`, is introselect: quickselect
with a fallback (heapselect) on bad pivot sequences, giving the same
expected O(n) with a worst-case bound. Reach for it for medians,
percentiles and top-k on an array you may reorder — and remember it
*does* reorder, which is exactly why it is faster than sorting.
