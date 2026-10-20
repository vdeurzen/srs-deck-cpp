---
id: dp-min-path-sum-code
kind: code
version: 1
level: 3
tags: [dynamic-programming, grids, lc-64]
input: chips
choices:
  c1: ["INT_MAX", "0", "INT_MIN"]
compile:
  harness: |
    using VV = std::vector<std::vector<int>>;
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return min_path_sum(VV{{1, 3, 1}, {1, 5, 1}, {4, 2, 1}}) == 7    // LC 64, example 1
          && min_path_sum(VV{{1, 2, 3}, {4, 5, 6}}) == 12              // LC 64, example 2
          && min_path_sum(VV{{5}}) == 5
          && min_path_sum(VV{{1}, {2}, {3}}) == 6;
    }
    static_assert(examples());
    int main() {}
requires:
  - dp-grid-paths-chunk
  - stl-int-limits
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/dungeon-game/
  - https://en.cppreference.com/w/cpp/types/climits
elaborate: Dungeon Game (LC 174) asks for the least starting health that walks right or down from top-left to bottom-right through cells that add or subtract health, never dropping below 1, and fills the table from the bottom-right corner. Where do the wall and the way-in cell go then?
---

Minimum Path Sum (LC 64): the least sum on a top-left to bottom-right
path through non-negative numbers, moving down or right. `d[j]` is the
best sum into column `j - 1` of the current row (`std::min` returns the
smaller of two values). Complete the start value.

```cpp
#include <algorithm>
#include <climits>
#include <vector>
constexpr int min_path_sum(const auto& g) {
  int m = g.size(), n = g[0].size();
  std::vector<int> d(n + 1, {{c1::INT_MAX}});  d[1] = 0;
  for (int i = 0; i < m; ++i)
    for (int j = 1; j <= n; ++j) d[j] = std::min(d[j], d[j - 1]) + g[i][j - 1];
  return d[n];
}
```

---

**`INT_MAX`: a wall outside the grid must never win the `min`.**
`d[0]` and, before row 0, `d[1..n]` stand for cells outside the grid;
only `d[1] = 0` lets the walk in, at the corner.

With `0`, every border cell is entered from outside for free:
`{1, 3, 1}, {1, 5, 1}, {4, 2, 1}` gives 3, not 7; `INT_MIN` is worse.
Every cell but the corner has a real neighbour above or to the left,
so `INT_MAX` is never picked, and never overflows.
