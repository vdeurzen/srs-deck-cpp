---
id: gr-grid-dfs-code
kind: code
version: 1
level: 3
tags: [graphs, dfs, flood-fill, grids, lc-200, lc-695]
input: chips
choices:
  c1:
    - "g[r][c] = '0'; for (int k = 0; k < 4; ++k) sink(g, r + dr[k], c + dc[k]);"
    - "for (int k = 0; k < 4; ++k) sink(g, r + dr[k], c + dc[k]); g[r][c] = '0';"
    - "g[r][c] = '0'; for (int k = 0; k < 2; ++k) sink(g, r + dr[k], c + dc[k]);"
    - "for (int k = 0; k < 4; ++k) sink(g, r + dr[k], c + dc[k]);"
compile:
  harness: |
    #include <vector>
    using Grid = std::vector<std::vector<char>>;
    #include <initializer_list>
    constexpr int islands(std::initializer_list<std::initializer_list<char>> rows) {
      Grid g;                                            // g142 rejects nested vector braces
      for (auto row : rows) g.emplace_back(row);         // in constant evaluation
      int n = 0;
      for (int r = 0; r < int(g.size()); ++r)
        for (int c = 0; c < int(g[r].size()); ++c)
          if (g[r][c] == '1') { sink(g, r, c); ++n; }
      return n;
    }
    static_assert(islands({{'1', '1', '0', '0'},
                           {'1', '0', '0', '1'},
                           {'0', '0', '1', '1'}}) == 2);
    static_assert(islands({{'1', '0', '1'},       // one island: the right column
                           {'1', '1', '1'}}) == 1);   // joins from below
    static_assert(islands({{'0', '1'},
                           {'1', '0'}}) == 2);        // no diagonals
    int main() {}
requires:
  - graph-dfs-call-stack-trace
  - graph-grid-as-graph
  - cpp-essentials/cast-functional-notation
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://leetcode.com/problems/number-of-islands/
  - https://leetcode.com/problems/max-area-of-island/
  - https://en.wikipedia.org/wiki/Flood_fill
elaborate: Max Area of Island (LC 695) wants the largest island's area, its number of `'1'` cells. What does `sink` return instead of `void`, and where is the `+ 1`?
---

Number of Islands (LC 200): count the islands of `'1'`s in a
`vector<vector<char>>`, joined up, down, left and right. The caller starts one `sink` at each
`'1'` it finds and counts one island per call, so `sink` has to deal
with the whole island around `(r, c)`. The `auto&` parameter makes
`sink` a template, compiled for whatever grid type it is passed.
Complete its last line.

```cpp
constexpr int dr[] = {1, 0, -1, 0}, dc[] = {0, 1, 0, -1};   // down, right, up, left
constexpr void sink(auto& g, int r, int c) {
  if (r < 0 || r >= int(g.size()) || c < 0 || c >= int(g[r].size())) return;
  if (g[r][c] != '1') return;
  {{c1::g[r][c] = '0'; for (int k = 0; k < 4; ++k) sink(g, r + dr[k], c + dc[k]);}}
}
```

---

**Mark the cell before recursing: the grid itself is the visited set.**
Overwriting `'1'` with `'0'` costs no extra memory, and the guard
`!= '1'` then stops at water and at visited land alike. O(rows × cols).

Marking after the calls, or never, lets two neighbours call each other
forever: the walk never ends, and on LeetCode the stack overflows.
Only down and right (`k < 2`) misses land that joins only from below:
on rows `101` over `111`, the top-right `'1'` is counted as a second
island.
