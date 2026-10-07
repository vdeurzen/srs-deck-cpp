---
id: sort-block-partition
kind: code
version: 1
level: 5
tags: [sorting, branchless, low-latency]
input: chips
choices:
  c1: ["!(a[i] < pivot)", "a[i] < pivot", "a[i] > pivot", "1u"]
compile:
  harness: |
    constexpr std::array<int, 8> kA{5, 9, 1, 7, 3, 8, 2, 6};
    constexpr auto kRun = [] {
      std::array<std::size_t, 8> off{};
      const std::size_t n = right_offsets(kA, 5, off);
      return std::pair{n, off};
    }();
    static_assert(kRun.first == 5);
    static_assert(kRun.second[0] == 0 && kRun.second[1] == 1 &&
                  kRun.second[2] == 3 && kRun.second[3] == 5 &&
                  kRun.second[4] == 7);
    int main() {}
requires:
  - sort-pattern-defeating
  - foundations-branch-misprediction
refs:
  - https://arxiv.org/abs/1604.06697
  - https://github.com/orlp/pdqsort
---

A block partition first records which elements belong on the right of
the pivot (values ≥ `pivot`), then swaps them in a second loop. Complete
the counter update so the recording loop has no data-dependent branch.

```cpp
#include <array>
#include <cstddef>
#include <utility>
constexpr std::size_t right_offsets(const std::array<int, 8>& a, int pivot,
                                    std::array<std::size_t, 8>& off) {
  std::size_t n = 0;
  for (std::size_t i = 0; i < a.size(); ++i) {
    off[n] = i;                 // always write, sometimes keep
    n += {{c1::!(a[i] < pivot)}};
  }
  return n;
}
```

---

The store is unconditional and the comparison result is added as 0 or
1, so the loop is straight-line code: a mispredicted branch per element
becomes a data dependency. This is BlockQuicksort's trick, used by
orlp's `pdqsort_branchless`. `a[i] < pivot` records the wrong side;
`a[i] > pivot` strands elements equal to the pivot on the left.
