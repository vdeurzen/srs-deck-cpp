---
id: graph-bfs-trace
kind: trace
version: 1
level: 2
tags: [graphs, traversal, tracing]
probes:
  1: { queue: "1 2", dist: "0 1 1 -1 -1 -1" }
  2: { queue: "3 4", dist: "0 1 1 2 2 -1" }
  3: { dist: "0 1 1 2 2 3" }
requires:
  - graph-bfs-why-shortest
  - graph-adjacency-list-vs-matrix
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
---

BFS from 0 on the graph in the comment. `step()` pops one vertex and
discovers its unseen neighbours; `-1` means "not reached yet". Give the
queue front first.

```cpp
// edges: 0-1 0-2 1-3 2-3 2-4 3-5 4-5 (undirected)
const std::vector<int> adj[6] = {{1, 2}, {0, 3}, {0, 3, 4}, {1, 2, 5}, {2, 5}, {3, 4}};
int dist[6] = {0, -1, -1, -1, -1, -1};
std::queue<int> q;
void step() {
  const int u = q.front(); q.pop();
  for (int v : adj[u])
    if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
}
int main() {
  q.push(0);
  step();                      // @1
  step(); step();              // @2
  while (!q.empty()) step();   // @3
}
```

---

Probe 2 is the key row: popping 2 finds 3 already discovered (by 1), so
3 keeps distance 2 and is not queued twice. The queue only ever holds
two adjacent distances, d and d + 1.

Why O(V + E): each vertex is pushed once (when `dist` stops being −1)
and popped once, and each adjacency list is scanned once, when its
vertex is popped. The lists hold 2E entries in total.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
