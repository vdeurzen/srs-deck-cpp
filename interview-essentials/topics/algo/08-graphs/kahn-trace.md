---
id: graph-kahn-trace
kind: trace
version: 1
level: 2
tags: [graphs, topological-sort, tracing]
probes:
  1: { order: "0", indeg: "0 0 1 1 2" }
  2: { order: "01", indeg: "0 0 0 0 2" }
  3: { order: "01234", indeg: "0 0 0 0 0" }
requires:
  - graph-topo-order
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
---

Kahn's algorithm: keep a queue of vertices with no remaining incoming
edges; emit one, then remove its out-edges. `indeg[v]` counts the
incoming edges not yet removed.

```cpp
// directed: 0→2 1→2 1→3 2→4 3→4
const std::vector<int> adj[5] = {{2}, {2, 3}, {4}, {4}, {}};
int indeg[5] = {0, 0, 2, 1, 2};
std::queue<int> ready;
std::string order;
void step() {
  const int u = ready.front(); ready.pop();
  order += std::to_string(u);
  for (int v : adj[u]) if (--indeg[v] == 0) ready.push(v);
}
int main() {
  ready.push(0); ready.push(1);      // the in-degree-0 vertices
  step();                            // @1
  step();                            // @2
  while (!ready.empty()) step();     // @3
}
```

---

After emitting 0, vertex 2 still waits on 1. Emitting 1 frees both 2
and 3; 4 waits for both of them. Each vertex is emitted once and each
edge decremented once: O(V + E).

On a graph with a cycle, the cycle's vertices never reach in-degree 0,
so `order` ends with fewer than V vertices. That shortfall is the cycle
check.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
