---
id: graph-kahn-trace
kind: trace
version: 4
level: 2
tags: [graphs, topological-sort, tracing]
probes:
  1: { "indeg[1]": "1" }
  out: "0 2 1"
requires:
  - graph-kahn-worked
  - std-queue-stack-adaptors
  - cpp-essentials/iter-range-for-const-auto-ref
  - cpp-essentials/io-cout-insertion
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
elaborate: The run prints fewer than V vertices. Say aloud what that tells you about the graph, and how a build tool would report it.
---

Kahn's algorithm on 0→1 and 2→1; `indeg[v]` counts v's incoming edges
not yet removed. @1 is read once, just after 0's edge to 1 goes.

```cpp
std::vector<int> adj[3] = {{1}, {}, {1}};
int indeg[3] = {0, 2, 0};
std::queue<int> ready;
ready.push(0);  ready.push(2);
while (!ready.empty()) {
  int u = ready.front();  ready.pop();
  std::cout << u << ' ';
  for (int v : adj[u]) {
    indeg[v] -= 1;
    if (indeg[v] == 0) ready.push(v);   // @1
  }
}
```

---

Emitting 0 removes one of 1's two incoming edges: `indeg[1]` drops only
to 1, so 1 is **not** queued. Emitting 2 removes the last one, and only
then does 1 join the queue: `0 2 1`.

(Values from running it under GCC 16.2.)
