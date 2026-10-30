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
    #include <utility>
    constexpr std::size_t partition(std::array<int, 8>& a, std::size_t lo,
                                    std::size_t hi) {       // pivot is a[hi]
      const int pivot = a[hi];
      std::size_t store = lo;
      for (std::size_t i = lo; i < hi; ++i)
        if (a[i] < pivot) { std::swap(a[i], a[store]); ++store; }
      std::swap(a[store], a[hi]);
      return store;
    }
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

Quickselect: quicksort that continues into **one** side. `partition`
returns the pivot's final index in `[lo, hi]`. Complete the step for a
target right of the pivot.

```cpp
#include <array>
constexpr std::size_t partition(std::array<int, 8>& a, std::size_t lo, std::size_t hi);
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

**The pivot is at its sorted index `p`, so the answer is right of it.**
Invariant: the k-th element is in `[lo, hi]`. `lo = p + 1` keeps it and
shrinks the range: expected Θ(n), not Θ(n log n). `hi = p` or
`hi = p + 1` discards the side holding the answer and returns a
neighbouring value, not a crash, which is why a test must check every
`k`. `lo = k` drops candidates between `p` and `k`.
