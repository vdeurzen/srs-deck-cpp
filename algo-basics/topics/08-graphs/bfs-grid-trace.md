---
id: graph-bfs-grid-trace
kind: trace
version: 2
level: 2
tags: [graphs, traversal, tracing, grids]
probes:
  1: { "dist[0][2]": "4", "dist[1][2]": "3" }
requires:
  - graph-bfs-trace
  - interview-essentials/graph-grid-as-graph
  - cpp-essentials/structured-bindings-basics
  - cpp-essentials/strings-std-string-intro
elaborate: Name another problem that is this grid search in disguise, and say what plays the part of the walls.
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
---

BFS on a grid: each open cell is a vertex, and its neighbours are the
open cells up, down, left and right. No adjacency list is stored. Give
the two distances after the search.

```cpp
const std::string grid[2] = {".#.", "..."};   // rows 0, 1; '#' = wall
int dist[2][3];                            // -1 everywhere, then dist[0][0] = 0
std::queue<std::pair<int, int>> q;         // starts holding (0, 0)
void step() {
  const auto [r, c] = q.front(); q.pop();
  const int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
  for (int k = 0; k < 4; ++k) {
    const int nr = r + dr[k], nc = c + dc[k];
    if (nr < 0 || nr >= 2 || nc < 0 || nc >= 3) continue;
    if (grid[nr][nc] == '#' || dist[nr][nc] != -1) continue;
    dist[nr][nc] = dist[r][c] + 1; q.push({nr, nc});
  }
}
int main() { q.push({0, 0}); while (!q.empty()) step(); }   // @1
```

---

The wall at (0, 1) blocks the short way, so the search goes down to
(1, 0), along row 1 and back up: (1, 2) is 3 steps and (0, 2), two
columns from the start, is 4. The grid is a graph whose edges are
computed on the fly; BFS does not care. O(rows × cols): each cell is
queued once and has at most four neighbours.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
