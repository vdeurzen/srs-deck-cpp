---
id: gr-01-bfs-code
kind: code
version: 1
level: 3
tags: [graphs, shortest-paths, 01-bfs, deque, grids, lc-2290, lc-1368]
input: chips
choices:
  c1:
    - "if (w == 0) q.push_front(v); else q.push_back(v);"
    - "if (w == 1) q.push_front(v); else q.push_back(v);"
    - "q.push_back(v);"
    - "q.push_front(v);"
compile:
  harness: |
    #include <array>
    #include <deque>
    #include <utility>
    #include <vector>
    using P = std::pair<int, int>;   // {to, weight}
    struct Deque {                   // constexpr stand-in for std::deque<int>
      std::vector<int> v;
      constexpr bool empty() const { return v.empty(); }
      constexpr int front() const { return v.front(); }
      constexpr void pop_front() { v.erase(v.begin()); }
      constexpr void push_front(int x) { v.insert(v.begin(), x); }
      constexpr void push_back(int x) { v.push_back(x); }
    };
    struct Adj {                     // 3x3 grid; counts how many cells are expanded
      std::vector<P> e[9];
      mutable int scans = 0;
      constexpr const std::vector<P>& operator[](int u) const { ++scans; return e[u]; }
    };
    constexpr bool removals(std::array<int, 9> grid, std::array<int, 9> want) {
      Adj g;                         // entering a cell costs its value: 0 empty, 1 obstacle
      for (int c = 0; c < 9; ++c) {
        const int r = c / 3, k = c % 3;
        if (r < 2) g.e[c].push_back({c + 3, grid[c + 3]});
        if (r > 0) g.e[c].push_back({c - 3, grid[c - 3]});
        if (k < 2) g.e[c].push_back({c + 1, grid[c + 1]});
        if (k > 0) g.e[c].push_back({c - 1, grid[c - 1]});
      }
      std::array<int, 9> d; d.fill(1'000'000'000);
      bfs01(g, d, 0, Deque{});
      return d == want && g.scans == 9;   // every cell expanded exactly once
    }
    static_assert(removals({0, 1, 1,  1, 1, 0,  1, 1, 0}, {0, 1, 2,  1, 2, 2,  2, 3, 2}));   // LC 2290, example 1
    static_assert(removals({0, 0, 1,  1, 0, 0,  0, 1, 0}, {0, 0, 1,  1, 0, 0,  1, 1, 0}));
    int main() {                     // also instantiates it with the real std::deque
      std::vector<P> g[2] = {{{1, 1}}, {}};
      std::array<int, 2> d{1'000'000'000, 1'000'000'000};
      bfs01(g, d, 0, std::deque<int>{});
      return d[1];
    }
requires:
  - rec-shortest-path-weights
refs:
  - https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/
  - https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/
  - https://cp-algorithms.com/graph/01_bfs.html
elaborate: Minimum Cost to Make at Least One Valid Path in a Grid (LC 1368) lets you follow a cell's arrow or pay 1 to go another way. Which moves get `w = 0`, and what would Dijkstra cost here instead?
---

Minimum Obstacle Removal to Reach Corner (LC 2290): in a grid of `0`
(empty) and `1` (obstacle) cells, moving up, down, left or right, find
the fewest obstacles to remove to walk from the top-left to the
bottom-right cell. Entering a cell costs its value. `g[u]` lists
`{v, w}` edges with `w` 0 or 1, `d` starts all infinite, and `q`
arrives as an empty `std::deque<int>`. Complete what is done with `v`
once its distance improves.

```cpp
constexpr void bfs01(const auto& g, auto& d, int s, auto q) {
  d[s] = 0; q.push_back(s);
  while (!q.empty()) {
    int u = q.front(); q.pop_front();
    for (auto [v, w] : g[u]) if (d[u] + w < d[v]) {
      d[v] = d[u] + w;
      {{c1::if (w == 0) q.push_front(v); else q.push_back(v);}}
    }
  }
}
```

---

**0-1 BFS: a free edge goes to the front, a cost-1 edge to the back.**
The deque then holds at most two distances, `D` in front and `D + 1`
behind, so the front is always a nearest cell, as in Dijkstra's heap,
at O(1) per push: O(V + E).

The distractors still converge, since every improvement is queued
again, but cells are expanded before their distance is final and then
re-expanded: on example 1, 10 or 11 expansions instead of 9, and far
more on larger grids.
