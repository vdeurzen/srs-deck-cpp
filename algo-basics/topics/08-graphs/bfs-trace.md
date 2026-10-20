---
id: graph-bfs-trace
kind: trace
version: 2
level: 2
tags: [graphs, traversal, tracing]
probes:
  1: { d3: "2", n: "2" }
requires:
  - interview-essentials/graph-bfs-worked
  - interview-essentials/graph-bfs-mark-on-push
  - interview-essentials/graph-adjacency-list-vs-matrix
elaborate: Where else does a queue that holds only two neighbouring levels show up, such as printing a tree level by level?
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
---

One step of BFS from 0; 0 and 1 have already been popped. `-1` means
"not reached yet".

```cpp
// edges: 0-1 0-2 1-3 2-3 2-4 3-5 4-5 (undirected)
const std::vector<int> adj[6] = {{1, 2}, {0, 3}, {0, 3, 4}, {1, 2, 5}, {2, 5}, {3, 4}};
int dist[6] = {0, 1, 1, 2, -1, -1};
std::queue<int> q;                    // holds 2 3, front first
const int u = q.front(); q.pop();
for (int v : adj[u])
  if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
int d3 = dist[3], n = q.size();       // @1
```

---

Popping 2 checks 0, 3 and 4. 0 and 3 are already reached, 3 by way of 1,
so 3 keeps distance 2 and is **not queued twice**; only 4 joins, at
distance 2. The queue holds `3 4`: it only ever holds two neighbouring
distances, d and d + 1.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
