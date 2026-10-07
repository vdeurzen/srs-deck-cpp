---
id: graph-prim-heap-trace
kind: trace
version: 1
level: 3
tags: [graphs, mst, heaps, tracing]
probes:
  1: { total: "2", stale: "0" }
  2: { total: "3", stale: "0" }
  3: { total: "7", stale: "2" }
requires:
  - graph-prim-trace
  - graph-dijkstra-trace
  - heap-stale-entries-code
refs:
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
  - https://en.wikipedia.org/wiki/Prim%27s_algorithm#Time_complexity
---

Prim's MST from 0 with a min-heap of (edge weight, vertex) entries, on
the same graph as the matrix version. An entry for a vertex already in
the tree is stale and skipped.

```cpp
// undirected: 0-1 (2) 0-2 (3) 1-2 (1) 1-3 (4) 2-3 (5)
using P = std::pair<int, int>;
const std::vector<P> adj[4] = {{{2, 1}, {3, 2}}, {{2, 0}, {1, 2}, {4, 3}},
                               {{3, 0}, {1, 1}, {5, 3}}, {{4, 1}, {5, 2}}};   // (w, v)
bool in[4] = {}; int total = 0, stale = 0;
std::priority_queue<P, std::vector<P>, std::greater<P>> pq;   // starts holding (0, 0)
void step() {
  const auto [key, u] = pq.top(); pq.pop();
  if (in[u]) { ++stale; return; }
  in[u] = true; total += key;
  for (auto [w, v] : adj[u]) if (!in[v]) pq.push({w, v});
}
// main: step(); step();               // @1
//       step();                       // @2
//       while (!pq.empty()) step();   // @3
```

---

Same tree as the O(V²) version: 1 joins at 2, 2 at 1, 3 at 4. The
entries (3, 2) and (5, 3) lose to cheaper edges and are popped stale.
The pushed key is the edge weight `w`, not `dist + w` as in Dijkstra.

Each edge pushes at most twice, so O(E) entries at O(log V) each:
O(E log V), better than O(V²) on sparse graphs.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
