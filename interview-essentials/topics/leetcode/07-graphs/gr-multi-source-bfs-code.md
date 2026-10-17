---
id: gr-multi-source-bfs-code
kind: code
version: 1
level: 3
tags: [graphs, bfs, multi-source-bfs, grids, lc-542, lc-994, lc-1162]
input: chips
choices:
  c1:
    - "d[c] = 0; q.push_back(c);"
    - "q.push_back(c);"
    - "d[c] = 1; q.push_back(c);"
    - "d[c] = 0;"
compile:
  harness: |
    constexpr std::array<std::array<int, 4>, 9> grid_nbrs() {   // up, down, left, right on 3x3
      std::array<std::array<int, 4>, 9> n{};
      for (int c = 0; c < 9; ++c) {
        const int r = c / 3, k = c % 3;
        n[c] = {r > 0 ? c - 3 : -1, r < 2 ? c + 3 : -1, k > 0 ? c - 1 : -1, k < 2 ? c + 1 : -1};
      }
      return n;
    }
    constexpr auto N = grid_nbrs();
    static_assert(nearest({1, 1, 1,
                           1, 0, 1,
                           1, 1, 0}, N) == Grid{2, 1, 2,
                                                1, 0, 1,
                                                2, 1, 0});
    static_assert(nearest({0, 1, 1,
                           1, 1, 1,
                           1, 1, 1}, N) == Grid{0, 1, 2,
                                                1, 2, 3,
                                                2, 3, 4});
    int main() {}
requires:
  - graph-bfs-mark-on-push
refs:
  - https://leetcode.com/problems/01-matrix/
  - https://leetcode.com/problems/rotting-oranges/
  - https://cp-algorithms.com/graph/breadth-first-search.html
elaborate: LC 994 (rotting oranges) and LC 1162 (as far from land as possible) are this same search. What does each change in the guard, and how does each read its answer out of `d`?
---

LC 542: for every cell of a 0/1 grid, find the number of steps to the
nearest 0. The queue is a `vector` read through index `h`. Complete what
runs for each 0 cell.

```cpp
#include <array>
#include <vector>
using Grid = std::array<int, 9>;                             // 3x3, row-major
constexpr Grid nearest(const Grid& g, const auto& nbrs) {    // nbrs[c]: 4 cells, -1 = off grid
  Grid d; d.fill(-1); std::vector<int> q;                     // d[c] == -1: not reached yet
  for (int c = 0; c < 9; ++c) if (g[c] == 0) { {{c1::d[c] = 0; q.push_back(c);}} }
  for (std::size_t h = 0; h < q.size(); ++h)
    for (int v : nbrs[q[h]]) if (v >= 0 && d[v] < 0) { d[v] = d[q[h]] + 1; q.push_back(v); }
  return d;
}
```

---

**Multi-source BFS: every source goes in the queue at distance 0, marked, before the loop.**
One search from all the 0s at once is a BFS from a virtual source with
an edge to each of them, so each cell gets the distance to its nearest
0 in one O(cells) pass. A BFS per 0 would be O(cells²).

Each distractor is a real slip. Pushing without setting `d[c] = 0`
("it gets marked when it is popped") leaves the source at d = −1, so its
neighbours get −1 + 1 = 0 and the source itself, reached again from
them, ends at 1. `d[c] = 1` is the off-by-one LC 994 invites ("rotten at
minute 1"): every distance comes out one too large. Marking without
pushing never expands the sources at all.

On LeetCode the grid is a 2-D vector and this line sits inside a
`dr`/`dc` loop over the cells; the seeding is the same.
