---
id: gr-multi-source-bfs-code
kind: code
version: 1
level: 3
tags: [graphs, bfs, multi-source-bfs, grids, lc-542, lc-994, lc-1162]
input: chips
choices:
  c1:
    - "d[c] = 0; q.push(c);"
    - "q.push(c);"
    - "d[c] = 1; q.push(c);"
    - "d[c] = 0;"
compile:
  harness: |
    #include <array>
    #include <vector>
    struct Queue {                   // constexpr stand-in for std::queue<int>
      std::vector<int> v;
      std::size_t h = 0;
      constexpr bool empty() const { return h == v.size(); }
      constexpr int front() const { return v[h]; }
      constexpr void push(int x) { v.push_back(x); }
      constexpr void pop() { ++h; }
    };
    constexpr std::array<std::array<int, 4>, 9> grid_nbrs() {   // up, down, left, right on 3x3
      std::array<std::array<int, 4>, 9> n{};
      for (int c = 0; c < 9; ++c) {
        const int r = c / 3, k = c % 3;
        n[c] = {r > 0 ? c - 3 : -1, r < 2 ? c + 3 : -1, k > 0 ? c - 1 : -1, k < 2 ? c + 1 : -1};
      }
      return n;
    }
    constexpr auto N = grid_nbrs();
    using Grid = std::array<int, 9>;
    constexpr Grid U{-1, -1, -1, -1, -1, -1, -1, -1, -1};
    static_assert(nearest(Grid{1, 1, 1,
                               1, 0, 1,
                               1, 1, 0}, N, U, Queue{}) == Grid{2, 1, 2,
                                                                1, 0, 1,
                                                                2, 1, 0});
    static_assert(nearest(Grid{0, 1, 1,
                               1, 1, 1,
                               1, 1, 1}, N, U, Queue{}) == Grid{0, 1, 2,
                                                                1, 2, 3,
                                                                2, 3, 4});
    #include <queue>
    int main() {                     // also instantiates it with the real std::queue
      Grid g{0, 1, 1, 1, 1, 1, 1, 1, 1};
      return nearest(g, N, U, std::queue<int>{})[8];
    }
requires:
  - gr-multi-source-seed
  - graph-bfs-mark-on-push
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/01-matrix/
  - https://leetcode.com/problems/rotting-oranges/
  - https://leetcode.com/problems/as-far-from-land-as-possible/
  - https://cp-algorithms.com/graph/breadth-first-search.html
elaborate: Rotting Oranges (LC 994, each minute every rotten orange rots its fresh neighbours; the minutes until none is fresh, or −1) and As Far from Land as Possible (LC 1162, the largest Manhattan distance from a water cell to its nearest land, or −1) are this same search. What does each change in the guard, and how does each read its answer out of `d`?
---

01 Matrix (LC 542): each cell's steps to the nearest 0. The 3×3 grid
`g` is stored as cells 0–8; `nbrs[c]` lists `c`'s 4 neighbours, -1 off
the grid. `d` arrives as nine -1s (unreached), `q` as an empty
`std::queue<int>`. Complete what runs for each 0 cell.

```cpp
constexpr auto nearest(const auto& g, const auto& nbrs, auto d, auto q) {
  for (int c = 0; c < 9; ++c)
    if (g[c] == 0) { {{c1::d[c] = 0; q.push(c);}} }
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : nbrs[u])
      if (v >= 0 && d[v] < 0) { d[v] = d[u] + 1; q.push(v); }
  }
  return d;
}
```

---

**Multi-source BFS: every source goes in the queue at distance 0, marked, before the loop.**
One O(cells) pass reaches each cell first from its nearest 0.

Pushing without setting `d[c] = 0` leaves the source at −1, so its
neighbours get −1 + 1 = 0 and the source, reached again from them, ends
at 1. `d[c] = 1` makes every distance one too large. Marking without
pushing never expands the sources at all.
