---
id: graph-dijkstra-trace
kind: trace
version: 1
level: 2
tags: [graphs, shortest-paths, heaps, tracing]
probes:
  1: { dist: "0 4 1 99", stale: "0" }
  2: { dist: "0 3 1 6", stale: "0" }
  3: { dist: "0 3 1 4", stale: "0" }
  4: { dist: "0 3 1 4", stale: "2" }
requires:
  - graph-dijkstra-popped-final
refs:
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue
---

Dijkstra from 0 with a min-heap of (distance, vertex) pairs. `99` stands
for "unreached". An entry whose distance is worse than the current
`dist` is stale and skipped.

```cpp
// directed, weight in brackets: 0→1 (4)  0→2 (1)  2→1 (2)  1→3 (1)  2→3 (5)
using P = std::pair<int, int>;
const std::vector<P> adj[4] = {{{4, 1}, {1, 2}}, {{1, 3}}, {{2, 1}, {5, 3}}, {}};   // (w, v)
int dist[4] = {0, 99, 99, 99}, stale = 0;
std::priority_queue<P, std::vector<P>, std::greater<P>> pq;   // smallest first
void step() {
  const auto [d, u] = pq.top(); pq.pop();
  if (d > dist[u]) { ++stale; return; }
  for (auto [w, v] : adj[u])
    if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }
}
int main() {
  pq.push({0, 0});
  step();                       // @1
  step();                       // @2
  step();                       // @3
  while (!pq.empty()) step();   // @4
}
```

---

Probe 2: vertex 2 (distance 1) is popped before 1 (distance 4), and the
detour 0→2→1 costs 3, beating the direct edge. Probe 3 does the same
for 3. The old entries (4, 1) and (6, 3) stay in the heap and are
skipped later: the two stale pops.

Why O((V + E) log V): each edge pushes at most one entry, so the heap
holds O(E) entries, and each push or pop costs O(log E) = O(log V).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
