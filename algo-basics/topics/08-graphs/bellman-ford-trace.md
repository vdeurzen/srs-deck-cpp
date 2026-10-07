---
id: graph-bellman-ford-trace
kind: trace
version: 1
level: 3
tags: [graphs, shortest-paths, tracing]
probes:
  1: { dist: "0 2 99 4" }
  2: { dist: "0 2 3 4" }
  3: { dist: "0 2 3 1" }
requires:
  - graph-bellman-ford-rounds
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---

Bellman-Ford from 0. `99` stands for "unreached". Note the order the
edges are listed in.

```cpp
struct Edge { int u, v, w; };
const Edge edges[] = {{2, 3, -2}, {1, 2, 1}, {0, 1, 2}, {0, 3, 4}};
int dist[4] = {0, 99, 99, 99};
void relax_all() {
  for (auto [u, v, w] : edges)
    if (dist[u] != 99 && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
}
int main() {
  relax_all();   // @1
  relax_all();   // @2
  relax_all();   // @3
}
```

---

The edges are listed back to front along the path 0→1→2→3, so each
round extends the known part by one edge: round 1 reaches 1 (and 3
directly, at 4), round 2 reaches 2, round 3 finds 0→1→2→3 = 1, beating
the direct 4 thanks to the −2 edge. V − 1 = 3 rounds were all needed.
In a lucky edge order, one round would have done it.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
