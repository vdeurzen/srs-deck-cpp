---
id: graph-prim-trace
kind: trace
version: 1
level: 3
tags: [graphs, mst, greedy, tracing]
probes:
  1: { u: "1", total: "2" }
  2: { u: "2", total: "3" }
  3: { u: "3", total: "7" }
requires:
  - graph-mst-cut-property
  - graph-dijkstra-trace
refs:
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
  - https://en.wikipedia.org/wiki/Prim%27s_algorithm
---

Prim's MST from vertex 0, the simple O(V²) version for a matrix.
`best[v]` is the lightest edge joining `v` to the tree so far (`99`:
none yet). `add()` returns the vertex it adds.

```cpp
// undirected matrix, 0 = no edge: 0-1 (2) 0-2 (3) 1-2 (1) 1-3 (4) 2-3 (5)
const int w[4][4] = {{0, 2, 3, 0}, {2, 0, 1, 4}, {3, 1, 0, 5}, {0, 4, 5, 0}};
int best[4] = {0, 99, 99, 99}, total = 0; bool in[4] = {};
int add() {
  int u = -1;
  for (int v = 0; v < 4; ++v) if (!in[v] && (u == -1 || best[v] < best[u])) u = v;
  in[u] = true; total += best[u];
  for (int v = 0; v < 4; ++v) if (!in[v] && w[u][v] && w[u][v] < best[v]) best[v] = w[u][v];
  return u;
}
int main() {
  add();             // vertex 0 joins at cost 0
  int u = add();     // @1
  u = add();         // @2
  u = add();         // @3
}
```

---

Each step adds the lightest edge leaving the tree: the cut property
with the tree on one side. Edge 1-2 (1) replaces 0-2 (3) as 2's best
once 1 joins; 3 joins by 1-3 (4), not 2-3 (5). Total 2 + 1 + 4 = 7.

It looks like Dijkstra, with one difference: the key is the single
edge `w[u][v]`, not the path length `dist[u] + w`. V picks of an O(V)
scan: O(V²), which suits a dense graph.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
