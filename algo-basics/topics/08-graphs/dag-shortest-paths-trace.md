---
id: graph-dag-shortest-paths-trace
kind: trace
version: 1
level: 3
tags: [graphs, shortest-paths, topological-sort, tracing]
probes:
  1: { dist: "0 3 6 99 99" }
  2: { dist: "0 3 -1 10 99" }
  3: { dist: "0 3 -1 1 2" }
requires:
  - graph-kahn-trace
  - graph-bellman-ford-rounds
refs:
  - https://en.wikipedia.org/wiki/Topological_sorting#Application_to_shortest_path_finding
---

Shortest paths from 0 in a DAG: relax each vertex's out-edges once,
visiting vertices in topological order (here 0 1 2 3 4). `99` stands
for "unreached". One edge is negative.

```cpp
// u→v (w): 0→1 (3) 0→2 (6) 1→2 (−4) 1→3 (7) 2→3 (2) 2→4 (9) 3→4 (1)
struct Edge { int v, w; };
const std::vector<Edge> out[5] = {{{1, 3}, {2, 6}}, {{2, -4}, {3, 7}}, {{3, 2}, {4, 9}}, {{4, 1}}, {}};
int dist[5] = {0, 99, 99, 99, 99};
void relax_from(int u) {
  for (auto [v, w] : out[u])
    if (dist[u] != 99 && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
}
int main() {
  relax_from(0);                   // @1
  relax_from(1);                   // @2
  relax_from(2); relax_from(3);    // @3
}
```

---

In topological order, every edge into `u` comes from a vertex already
processed, so `dist[u]` is final before `u`'s own edges are relaxed.
One pass suffices: O(V + E), negative edges allowed, with no heap and
none of Bellman-Ford's V − 1 rounds. 2 drops from 6 to −1 via 1, and
that improvement flows on to 3 and 4.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
