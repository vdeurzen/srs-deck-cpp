---
id: sort-three-way-partition
kind: code
version: 1
level: 4
tags: [sorting, partitioning, invariants]
input: chips
choices:
  c1:
    - "std::swap(a[i], a[--gt]);"
    - "std::swap(a[i++], a[--gt]);"
    - "std::swap(a[i], a[gt--]);"
    - "std::swap(a[i++], a[gt--]);"
compile:
  harness: |
    constexpr auto run(std::array<int, 10> a, int pivot) {
      const Bounds b = partition3(a, pivot);
      return std::pair{a, b};
    }
    constexpr auto kR = run({3, 5, 1, 3, 9, 3, 0, 7, 3, 4}, 3);
    static_assert(kR.second.lt == 2 && kR.second.gt == 6);
    static_assert(kR.first == std::array{1, 0, 3, 3, 3, 3, 7, 9, 4, 5});
    constexpr auto kSame = run({2, 2, 2, 2, 2, 2, 2, 2, 2, 2}, 2);
    static_assert(kSame.second.lt == 0 && kSame.second.gt == 10);
    int main() {}
requires:
  - sort-quickselect
elaborate: Sorting a column with a handful of distinct values (a status flag, a country code) — what does a two-way partition do to it?
refs:
  - https://www.cs.utexas.edu/~EWD/ewd03xx/EWD398.PDF
  - https://go.dev/src/sort/zsortinterface.go
---

Three-way partition: afterwards `[0, lt)` is `< pivot`, `[lt, gt)` is
`== pivot`, and `[gt, n)` is `> pivot`. Complete the step for an element
greater than the pivot.

```cpp
#include <array>
#include <cstddef>
#include <utility>
struct Bounds { std::size_t lt, gt; };
constexpr Bounds partition3(std::array<int, 10>& a, int pivot) {
  std::size_t lt = 0, i = 0, gt = a.size();   // [i, gt) is unexamined
  while (i < gt) {
    if (a[i] < pivot) std::swap(a[lt++], a[i++]);
    else if (a[i] > pivot) {{c1::std\::swap(a[i], a[--gt]);}}
    else ++i;
  }
  return {lt, gt};
}
```

---

The element swapped in from `--gt` comes from the unexamined region,
so `i` must **not** advance: it is classified next iteration. Advancing
skips it, and a large value can stay in the middle. `gt` starts one past
the end, so `gt--` swaps with `a[10]`. On the low side, `a[lt]` is
already examined, so `i++` there is right. With all keys equal, every
element lands in the middle in one pass, where a two-way partition
recurses into quadratic time; pdqsort's `partitionEqual` serves the same
purpose.
