---
id: sort-selection-min-code
kind: code
version: 1
level: 2
tags: [foundations, sorting, selection-sort]
input: chips
choices:
  c1:
    - "a[j] < a[m]"
    - "a[j] < a[i]"
    - "a[j] > a[m]"
    - "a[j] < a[j - 1]"
compile:
  harness: |
    static_assert(selection_sort({4, 6, 1, 5, 2, 3}) == std::array{1, 2, 3, 4, 5, 6});
    static_assert(selection_sort({2, 1, 6, 5, 3, 4}) == std::array{1, 2, 3, 4, 5, 6});
    int main() {}
requires:
  - sort-selection-invariant
elaborate: Selection sort makes at most n − 1 swaps; when would that matter more than its n²/2 comparisons?
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Selection_sort
---

Complete the test that decides which element pass `i` will move into
slot `i`.

```cpp
#include <array>
#include <utility>
constexpr std::array<int, 6> selection_sort(std::array<int, 6> a) {
  for (int i = 0; i < 5; ++i) {
    int m = i;
    for (int j = i + 1; j < 6; ++j) if ({{c1::a[j] < a[m]}}) m = j;
    std::swap(a[i], a[m]);
  }
  return a;
}
```

---

`m` is the index of the smallest value seen so far in `a[i, j)`, so each
candidate is compared with `a[m]`. Against `a[i]`, `m` ends on the *last*
value below `a[i]`, not the smallest; against `a[j - 1]` it ends on the
last descent. One swap per pass: at most n − 1 swaps in all.
