---
id: stl-iota-argsort
kind: code
version: 1
level: 3
tags: [stl, sorting, ranges, lc-2418]
input: chips
choices:
  c1:
    - "h[i]"
    - "i"
    - "h[idx[i]]"
compile:
  harness: |
    static_assert(tallest_first({180, 165, 170}) == std::vector<int>{0, 2, 1});
    static_assert(tallest_first({155, 185, 150}) == std::vector<int>{1, 0, 2});
    static_assert(tallest_first({3, 9, 4, 1, 7}) == std::vector<int>{1, 4, 2, 0, 3});
    int main() {}
requires:
  - cpp-core/ranges-sort-projection
refs:
  - https://leetcode.com/problems/sort-the-people/
  - https://en.cppreference.com/w/cpp/algorithm/iota
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: LC 1365 (how many numbers are smaller than the current one) answers per original position. Why does sorting the values alone lose what you need?
---

LC 2418 (Sort the People): heights are distinct; list the names
tallest first. `idx` will hold the order in which to read `names`.
Complete what the projection returns.

```cpp
#include <algorithm>
#include <numeric>
#include <vector>
constexpr std::vector<int> tallest_first(const std::vector<int>& h) {
  std::vector<int> idx(h.size());
  std::iota(idx.begin(), idx.end(), 0);
  std::ranges::sort(idx, std::greater{}, [&](int i) { return {{c1::h[i]}}; });
  return idx;
}
```

---

**Map each position to its key, `h[i]`: this is an argsort.** `iota`
fills `idx` with 0..n−1; sorting it by `h[i]` leaves the heights alone,
and the caller reads `names[idx[k]]`. Returning `i` sorts the positions
themselves. The sort already passes each *element* of `idx` as `i`, so
`h[idx[i]]` indexes twice: it looks up a position of a position.
