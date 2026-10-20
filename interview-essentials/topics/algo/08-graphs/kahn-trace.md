---
id: graph-kahn-trace
kind: trace
version: 3
level: 2
tags: [graphs, topological-sort, tracing]
probes:
  1: { "order[1]": "2", "order[2]": "1" }
requires:
  - graph-kahn-worked
  - std-queue-stack-adaptors
  - cpp-essentials/iter-range-for-const-auto-ref
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
elaborate: The run ends with `order` shorter than V. Say aloud what that tells you about the graph, and how a build tool would report it.
---

Kahn's algorithm on 0→1 and 2→1. `ready` starts with the vertices that
have no incoming edge, 0 then 2; `indeg[v]` counts the edges into `v`
not yet removed, and `adj[u]` lists u's out-neighbours.

```cpp
const std::vector<int> adj[3] = {{1}, {}, {1}};
int indeg[3] = {0, 2, 0};
std::queue<int> ready;           // holds 0, then 2
std::vector<int> order;
while (!ready.empty()) {
  const int u = ready.front();
  ready.pop();
  order.push_back(u);
  for (int v : adj[u]) {
    indeg[v] -= 1;
    if (indeg[v] == 0) ready.push(v);
  }
}                                // @1
```

---

Emitting 0 removes one of 1's two incoming edges, so `indeg[1]` drops
only to 1 and 1 is **not** queued; 2 goes next. Emitting 2 removes the
last edge into 1, and only then does 1 join the queue: `0 2 1`. A vertex
waits for every vertex that points into it.

On a graph with a cycle, the cycle's vertices never reach in-degree 0,
so `order` ends with fewer than V vertices: that shortfall is the cycle
check.

(Values from running it under GCC 16.2.)
