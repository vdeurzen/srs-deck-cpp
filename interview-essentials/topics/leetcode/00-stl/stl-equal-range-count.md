---
id: stl-equal-range-count
kind: code
version: 1
level: 2
tags: [stl, binary-search, lc-34]
input: chips
choices:
  c1:
    - "hi - v.begin() - 1"
    - "hi - v.begin()"
    - "hi - lo"
    - "hi - lo - 1"
compile:
  harness: |
    static_assert(search_range({5, 7, 7, 8, 8, 10}, 8) == std::vector<int>{3, 4});
    static_assert(search_range({5, 7, 7, 8, 8, 10}, 6) == std::vector<int>{-1, -1});
    static_assert(search_range({1}, 1) == std::vector<int>{0, 0});
    int main() {}
requires:
  - search-lower-bound-meaning
refs:
  - https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
  - https://en.cppreference.com/w/cpp/algorithm/equal_range
elaborate: LC 2089 asks for every index of the target after sorting. What do `lo` and `hi` give you directly?
---

LC 34: return the first and last index of `t` in the sorted `v`, or
`{-1, -1}`. Complete the last index.

```cpp
#include <algorithm>
#include <vector>
constexpr std::vector<int> search_range(const std::vector<int>& v, int t) {
  auto [lo, hi] = std::equal_range(v.begin(), v.end(), t);
  if (lo == hi) return {-1, -1};
  return {int(lo - v.begin()), int({{c1::hi - v.begin() - 1}})};
}
```

---

**`hi` is one past the last match: the run is the half-open `[lo, hi)`.**
`equal_range` is `lower_bound` and `upper_bound` in one call, so `hi`
points at the first element *greater* than `t`. Its index is one too
far; `hi - lo` is the number of matches (the count), not a position.
Empty run: `lo == hi`, at the insertion point.
