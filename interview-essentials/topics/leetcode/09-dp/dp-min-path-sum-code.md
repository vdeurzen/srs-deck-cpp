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
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return min_path_sum({{1, 3, 1}, {1, 5, 1}, {4, 2, 1}}) == 7    // LC 64, example 1
          && min_path_sum({{1, 2, 3}, {4, 5, 6}}) == 12              // LC 64, example 2
          && min_path_sum({{5}}) == 5
          && min_path_sum({{1}, {2}, {3}}) == 6;
    }
    static_assert(examples());
    int main() {}
requires:
  - dp-grid-paths-chunk
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://en.cppreference.com/w/cpp/types/climits
elaborate: LC 174 (dungeon game) fills the table from the bottom-right corner. Where do the wall and the way-in cell go then?
---

LC 64 with one rolling row. `d[j]` is column `j - 1`; `d[0]` is a wall
left of the grid, and before the first row `d[1..n]` stand for the row
above it, with `d[1] = 0` as the way in. Complete the start value.

```cpp
#include <bits/stdc++.h>
constexpr int min_path_sum(const std::vector<std::vector<int>>& g) {
  int n = g[0].size();
  std::vector<int> d(n + 1, {{c1::INT_MAX}});
  d[1] = 0;
  for (const auto& row : g)
    for (int j = 1; j <= n; ++j) d[j] = std::min(d[j], d[j - 1]) + row[j - 1];
  return d[n];
}
```

---

**`INT_MAX`: a wall must never win the `min`.** Only the corner is
entered from outside, through `d[1] = 0`.

With `0`, every border cell can be "entered" from outside for free:
the top row costs each cell only itself, and example 1 comes out as 3,
not 7. Negative starts are cheaper still. `INT_MAX` is safe: every cell
has one real neighbour (above or left), so `min` never picks it.
