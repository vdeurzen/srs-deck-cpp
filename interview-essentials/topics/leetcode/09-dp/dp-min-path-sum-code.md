---
id: dp-min-path-sum-code
kind: code
version: 1
level: 3
tags: [dynamic-programming, grids, lc-64]
input: chips
choices:
  c1: ["INT_MAX", "0", "-1", "INT_MIN"]
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

Minimum Path Sum (LC 64): the smallest sum along a path from the
top-left to the bottom-right of a grid of non-negative numbers, moving
only down or right. One rolling row of `n + 1` entries: `d[j]` holds
column `j - 1`, and `d[0]` sits left of the grid, never a real cell.
Before the first row, `d[1..n]` stand for a row above the grid, with
`d[1] = 0` as the way in (`std::min` returns the smaller of two
values). Complete the start value.

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

**`INT_MAX`: a wall must never win the `min`.** Only the corner is
entered from outside, through `d[1] = 0`.

With `0`, every border cell can be "entered" from outside for free:
the top row costs each cell only itself, and the grid
`{1, 3, 1}, {1, 5, 1}, {4, 2, 1}` comes out as 3, not 7. Negative starts are cheaper still. `INT_MAX` is safe: every cell
has one real neighbour (above or left), so `min` never picks it.
