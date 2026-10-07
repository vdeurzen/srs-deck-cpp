---
id: graph-bfs-grid-trace
kind: trace
version: 1
level: 2
tags: [graphs, traversal, tracing, grids]
probes:
  1: { "dist[1][2]": "5", "dist[0][3]": "7", "dist[2][3]": "5" }
requires:
  - graph-bfs-trace
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
---

BFS on a grid: each open cell is a vertex, and its neighbours are the
open cells up, down, left and right. No adjacency list is stored. Give
the three distances after the search.

```cpp
const std::string grid[3] = {"..#.", ".#..", "...."};   // rows 0, 1, 2; '#' = wall
int dist[3][4];                            // -1 everywhere, then dist[0][0] = 0
std::queue<std::pair<int, int>> q;         // starts holding (0, 0)
void step() {
  const auto [r, c] = q.front(); q.pop();
  const int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
  for (int k = 0; k < 4; ++k) {
    const int nr = r + dr[k], nc = c + dc[k];
    if (nr < 0 || nr >= 3 || nc < 0 || nc >= 4) continue;
    if (grid[nr][nc] == '#' || dist[nr][nc] != -1) continue;
    dist[nr][nc] = dist[r][c] + 1; q.push({nr, nc});
  }
}
int main() { q.push({0, 0}); while (!q.empty()) step(); }   // @1
```

---

The walls force the route down column 0, along row 2, then up:
(1, 2) and (2, 3) are both 5 steps, and (0, 3), three columns from the
start, is 7. The grid is a graph whose edges are computed on the fly;
BFS does not care. O(rows × cols): each cell is queued once and has at
most four neighbours.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
