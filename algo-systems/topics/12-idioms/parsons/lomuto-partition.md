---
id: parsons-lomuto-partition
kind: parsons
version: 1
level: 4
tags: [sorting, selection, invariants]
distractors:
  - "if (a[i] > pivot) { std::swap(a[i], a[store]); ++store; }"
  - "std::swap(a[store], a[lo]);"
compile:
  harness: |
    constexpr std::array<int, 8> partitioned(std::array<int, 8> a) {
      partition(a, 0, a.size() - 1);
      return a;
    }
    constexpr std::array<int, 8> kIn{5, 3, 9, 1, 7, 2, 8, 6};
    static_assert(partitioned(kIn) ==
                  std::array<int, 8>{5, 3, 1, 2, 6, 9, 8, 7});
    constexpr std::array<int, 8> kSorted{1, 2, 3, 4, 5, 6, 7, 8};
    static_assert(partitioned(kSorted) == kSorted);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
---

```cpp
#include <array>
#include <cstddef>
#include <utility>
constexpr std::size_t partition(std::array<int, 8>& a, std::size_t lo,
                                std::size_t hi) {
  const int pivot = a[hi];
  std::size_t store = lo;
  for (std::size_t i = lo; i < hi; ++i) {
    if (a[i] < pivot) {
      std::swap(a[i], a[store]);
      ++store;
    }
  }
  std::swap(a[store], a[hi]);
  return store;
}
```

---

The Lomuto scheme, whose invariant is one sentence: everything in
`[lo, store)` is less than the pivot, and everything in `[store, i)`
is not. `store` is therefore always the slot the next small element
belongs in, and when the scan ends it is the pivot's final position —
hence the closing swap with `a[hi]`, which is the line that puts the
pivot *in place* and makes quicksort and quickselect work.

The distractors are the two most common mutations: reversing the
comparison (which partitions the other way and breaks every caller's
assumption about which side holds what), and swapping the pivot back
to `lo` instead of to `store`, which leaves the pivot outside its
sorted position and silently breaks quickselect's `k == p` test.

Worth knowing alongside it: Lomuto is simpler but does more swaps than
**Hoare's** two-pointer scheme, and it degrades to O(n²) on inputs with
many equal keys, since every equal element goes to the same side. Real
implementations use Hoare partitioning plus three-way ("Dutch national
flag") splitting to handle duplicates, plus median-of-three pivot
selection so a sorted input is not the worst case.

The Harness evaluates the result at compile time, so an ordering that
compiles but partitions incorrectly still fails (SPEC §4.8).
