---
id: graph-dag-shortest-paths-trace
kind: trace
version: 2
level: 3
tags: [graphs, shortest-paths, topological-sort, tracing]
probes:
  1: { "dist[2]": "-1", "dist[3]": "0" }
requires:
  - graph-dag-shortest-paths-worked
  - interview-essentials/graph-kahn-trace
  - cpp-essentials/structured-bindings-basics
  - cpp-essentials/class-struct-members
elaborate: Where do weighted DAGs show up in your work, such as build steps or task schedules, and what would this one pass compute there?
refs:
  - https://en.wikipedia.org/wiki/Topological_sorting#Application_to_shortest_path_finding
---

Shortest paths from 0 in a DAG: relax each vertex's out-edges once,
visiting the vertices in topological order, here 0 1 2 3. `99` stands
for "unreached". One edge is negative.

```cpp
// u→v (w): 0→1 (2) 0→2 (5) 1→2 (−3) 2→3 (1)
struct Edge { int v, w; };
const std::vector<Edge> out[4] = {{{1, 2}, {2, 5}}, {{2, -3}}, {{3, 1}}, {}};
int dist[4] = {0, 99, 99, 99};
for (int u = 0; u < 4; ++u)
  for (auto [v, w] : out[u])
    if (dist[u] != 99 && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
// @1
```

---

From 0, `dist[1]` = 2 and `dist[2]` = 5. From 1, the negative edge lowers
`dist[2]` to 2 − 3 = −1. Only then is 2 relaxed, so 3 gets −1 + 1 = 0,
not 6: **in topological order each vertex's distance is final before
its own edges are used**.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
