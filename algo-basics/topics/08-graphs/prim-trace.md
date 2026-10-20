---
id: graph-prim-trace
kind: trace
version: 2
level: 3
tags: [graphs, mst, greedy, tracing]
probes:
  1: { u: "1", "best[2]": "1" }
requires:
  - graph-prim-worked
  - graph-mst-cut-property
elaborate: Say in one sentence, as to an interviewer, why this O(V²) version suits a dense graph better than a heap does.
refs:
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
  - https://en.wikipedia.org/wiki/Prim%27s_algorithm
---

One step of Prim's MST, the simple O(V²) version on a matrix. Vertex 0
is already in the tree. `best[v]` is the lightest edge joining `v` to
the tree so far (`99`: none yet).

```cpp
// undirected matrix, 0 = no edge: 0-1 (2) 0-2 (3) 1-2 (1) 1-3 (4) 2-3 (5)
const int w[4][4] = {{0, 2, 3, 0}, {2, 0, 1, 4}, {3, 1, 0, 5}, {0, 4, 5, 0}};
int best[4] = {0, 2, 3, 99}, total = 0;
bool in[4] = {true, false, false, false};
int u = -1;
for (int v = 0; v < 4; ++v) if (!in[v] && (u == -1 || best[v] < best[u])) u = v;
in[u] = true; total += best[u];
for (int v = 0; v < 4; ++v) if (!in[v] && w[u][v] && w[u][v] < best[v]) best[v] = w[u][v];
// @1
```

---

The scan picks `u` = 1, the cheapest `best` (2). Then 1's edges lower
its neighbours: 1-2 (1) beats 2's old best of 3, and 1-3 (4) beats 99.
The key is the single edge `w[u][v]`, **not the path length**
`best[u] + w[u][v]` that Dijkstra would store (3 for vertex 2).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
