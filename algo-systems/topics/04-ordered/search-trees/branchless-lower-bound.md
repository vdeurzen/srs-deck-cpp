---
id: ordered-branchless-lower-bound
kind: code
version: 1
level: 4
tags: [binary-search, branchless, invariants]
requires:
  - ordered-search-mispredict
input: chips
choices:
  c1:
    - "base += (base[half - 1] < key) * half;"
    - "base += (base[half - 1] <= key) * half;"
    - "base += (base[half - 1] < key) * (half - 1);"
    - "base += (base[0] < key) * half;"
compile:
  harness: |
    inline constexpr int kData[] = {1, 3, 3, 5, 8, 13};
    static_assert(lower_index(kData, 0) == 0);
    static_assert(lower_index(kData, 1) == 0);
    static_assert(lower_index(kData, 3) == 1);   // first of the duplicates
    static_assert(lower_index(kData, 4) == 3);
    static_assert(lower_index(kData, 13) == 5);
    static_assert(lower_index(kData, 14) == 6);  // past the end
    inline constexpr int kOdd[] = {2, 4, 6, 8, 10, 12, 14};
    static_assert(lower_index(kOdd, 1) == 0);
    static_assert(lower_index(kOdd, 7) == 3);
    static_assert(lower_index(kOdd, 14) == 6);
    int main() {}
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
---

This `lower_bound` keeps a base pointer and a shrinking length instead of
`lo`/`hi`. Complete the step so it has no data-dependent branch: the
comparison's result must feed arithmetic, not control flow.

```cpp
#include <cstddef>
#include <span>

constexpr std::size_t lower_index(std::span<const int> a, int key) {  // a non-empty
  const int* base = a.data();
  for (std::size_t n = a.size(); n > 1;) {
    const std::size_t half = n / 2;
    {{c1::base += (base[half - 1] < key) * half;}}
    n -= half;
  }
  return std::size_t(base - a.data()) + (*base < key);
}
```

---

`true` is 1 and `false` is 0, so the multiply either advances `base` by
`half` or leaves it: GCC and Clang emit a `cmov`, and the loop runs
exactly ⌈log₂ n⌉ times whatever the data. `base[half - 1] < key` proves
everything up to and including that element is too small; `<=` finds
`upper_bound` instead (key 3 gives 3, not 1). Advancing by `half - 1`
breaks the halving, and testing `base[0]` asks the wrong element. The
final `+ (*base < key)` handles a key above the whole range.
