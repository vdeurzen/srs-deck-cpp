---
id: parsons-lomuto-partition
kind: parsons
version: 2
level: 4
tags: [sorting, selection, invariants]
distractors:
  - "if (a[i] > pivot) { std::swap(a[i], a[store]); ++store; }"
  - "std::swap(a[store], a[lo]);"
compile:
  harness: |
    #include <array>
    constexpr std::array<int, 8> partitioned(std::array<int, 8> a) {
      partition(a.data(), 0, 7);
      return a;
    }
    static_assert(partitioned({5, 3, 9, 1, 7, 2, 8, 6}) ==
                  std::array<int, 8>{5, 3, 1, 2, 6, 9, 8, 7});
    static_assert(partitioned({1, 2, 3, 4, 5, 6, 7, 8}) ==
                  std::array<int, 8>{1, 2, 3, 4, 5, 6, 7, 8});
    int main() {}
requires:
  - sort-introsort
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
---

Partition `a[lo..hi]` around the pivot `a[hi]` and return the pivot's
final index. *Take the pivot*, *scan*, *move smaller elements left*,
*place the pivot*: order the lines.

```cpp
#include <utility>
constexpr int partition(int* a, int lo, int hi) {
  const int pivot = a[hi];
  int store = lo;
  for (int i = lo; i < hi; ++i)
    if (a[i] < pivot) { std::swap(a[i], a[store]); ++store; }
  std::swap(a[store], a[hi]);
  return store;
}
```

---

**Lomuto partition.** Invariant: `[lo, store)` is less than the pivot
and `[store, i)` is not, so when the scan ends `store` is the pivot's
sorted position and the closing swap puts it there. Reversing the
comparison partitions the wrong way round; swapping the pivot with
`a[lo]` leaves it outside its sorted slot, which breaks quickselect's
`k == p` test. Lomuto degrades to O(n²) when many keys are equal.
