---
id: sort-quicksort-chunk
kind: chunk
version: 1
level: 2
tags: [idioms, sorting, quicksort]
expose_ms: 8000
compile:
  harness: |
    #include <array>
    constexpr std::array<int, 7> sorted(std::array<int, 7> a) {
      quick_sort(a.data(), a.data() + a.size());
      return a;
    }
    static_assert(sorted({3, 1, 6, 2, 7, 5, 4}) == std::array{1, 2, 3, 4, 5, 6, 7});
    static_assert(sorted({4, 4, 1, 4, 2, 4, 4}) == std::array{1, 2, 4, 4, 4, 4, 4});
    int main() {}
requires:
  - sort-lomuto-trace
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://doi.org/10.1093/comjnl/5.1.10
---

```cpp
#include <algorithm>
constexpr void quick_sort(int* first, int* last) {
  if (last - first < 2) return;
  int* mid = std::partition(first, last - 1, [p = last[-1]](int x) { return x < p; });
  std::iter_swap(mid, last - 1);
  quick_sort(first, mid); quick_sort(mid + 1, last);
}
```

---

Quicksort with the last element as pivot: `std::partition` moves every
key smaller than the pivot to the front (Lomuto's loop), `iter_swap`
drops the pivot at `mid`, its final slot, and both sides are sorted
without it, so each call shrinks the range. No merge step. Compile-
checked: the harness sorts two arrays, one full of duplicates, at
compile time.
