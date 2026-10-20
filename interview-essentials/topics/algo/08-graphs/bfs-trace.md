---
id: graph-bfs-trace
kind: trace
version: 2
level: 2
tags: [graphs, traversal, tracing]
probes:
  1: { "dist[2]": "1" }
requires:
  - graph-bfs-worked
  - graph-bfs-why-shortest
  - std-queue-stack-adaptors
  - cpp-essentials/iter-range-for-intro
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
  - https://en.cppreference.com/w/cpp/container/queue
elaborate: Swap the queue for a stack in this run. Which `dist` comes out wrong, and why?
---

BFS from 0 on the triangle 0–1, 1–2, 0–2. `dist[v] == -1` means v has
not been reached yet.

```cpp
std::vector<int> adj[3] = {{1, 2}, {0, 2}, {0, 1}};
int dist[3] = {0, -1, -1};
std::queue<int> q;
q.push(0);
while (!q.empty()) {
  int u = q.front();
  q.pop();
  for (int v : adj[u])
    if (dist[v] == -1) {
      dist[v] = dist[u] + 1;
      q.push(v);
    }
}                                // @1
```

---

Popping 0 reaches both 1 and 2 at distance 1 and queues them. Popping 1
finds 2 already reached, so 2 keeps 1: **the route 0–1–2 never
counts, because 0's direct edge reached 2 first.** Popping 2 adds
nothing.

(Values from running it under GCC 16.2.)
