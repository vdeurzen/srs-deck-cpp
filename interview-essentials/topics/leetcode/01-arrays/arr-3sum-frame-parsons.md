---
id: arr-3sum-frame-parsons
kind: parsons
version: 1
level: 3
tags: [two-pointers, 3sum, arrays, lc-15]
distractors:
  - "    for (std::size_t lo = i, hi = a.size() - 1; lo < hi;)"
compile:
  harness: |
    static_assert(has_zero_triple({-1, 0, 1, 2, -1, -4}));   // LC 15, example 1
    static_assert(!has_zero_triple({0, 1, 1}));              // LC 15, example 2
    static_assert(has_zero_triple({0, 0, 0}));               // LC 15, example 3
    static_assert(!has_zero_triple({-1, 2, 7}));             // no element used twice
    static_assert(has_zero_triple({-4, 1, 3, 2, 0}));        // needs the sort
    static_assert(!has_zero_triple({1, 2, -2, -1}));
    int main() {}
requires:
  - linear-two-pointers-code
refs:
  - https://leetcode.com/problems/3sum/
  - https://en.wikipedia.org/wiki/3SUM
elaborate: LC 16 (3Sum Closest) keeps this frame. What replaces `return true`, and does the pointer step change?
---

The frame of LC 15 before any de-duplication: does some triplet at three
different positions sum to 0? Order the lines.

```cpp
#include <bits/stdc++.h>
constexpr bool has_zero_triple(std::vector<int> a) {
  std::ranges::sort(a);
  for (std::size_t i = 0; i + 2 < a.size(); ++i)
    for (std::size_t lo = i + 1, hi = a.size() - 1; lo < hi;)
      if (int s = a[i] + a[lo] + a[hi]; s == 0) return true;
      else if (s < 0) ++lo; else --hi;
  return false;
}
```

---

**Sort, fix `a[i]`, then a two-pointer pair scan right of `i`.** O(n²)
instead of O(n³). The scan is only valid on sorted input, and it starts
at `i + 1`, so each triplet uses three positions.

The distractor starts `lo` at `i`, so `a[i]` can pair with itself:
`{-1, 2, 7}` "finds" −1 − 1 + 2.
