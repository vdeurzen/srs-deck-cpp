---
id: sort-strict-weak-ordering
kind: code
version: 1
level: 3
tags: [sorting, undefined-behaviour, invariants]
input: chips
choices:
  c1: ["x < y", "x <= y", "!(y < x)", "!(x > y)"]
compile:
  harness: |
    static_assert(sorts_ascending());
    int main() {}
requires:
  - sort-introsort
elaborate: Where in your own code does a comparator compare floating-point keys that may be NaN — and what makes that the same bug?
refs:
  - https://en.cppreference.com/w/cpp/named_req/Compare
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
---

Many entries share a value. Complete the comparator so `std::sort`
orders the array ascending.

```cpp
#include <algorithm>
#include <array>
constexpr bool sorts_ascending() {
  std::array<int, 40> a{};
  for (int i = 0; i < 40; ++i) a[i] = (i * 7) % 3;  // 0, 1, 2 repeated
  std::sort(a.begin(), a.end(), [](int x, int y) { return {{c1::x < y}}; });
  return std::is_sorted(a.begin(), a.end());
}
```

---

`std::sort` requires a **strict weak ordering**: in particular
`cmp(x, x)` must be `false`. The three distractors are all `<=` in
disguise, and they are not "a different order for equal elements" —
they are undefined behaviour. libstdc++'s `__unguarded_partition` scans
`while (comp(*first, *pivot)) ++first;` with no bounds check, relying on
the comparator to stop at an element not less than the pivot; with
`<=` the pivot itself never stops it. GCC 16.2 evaluating this at
compile time reports "array subscript value '40' is outside the bounds
of array": at run time it is an out-of-bounds read.
