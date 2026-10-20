---
id: graph-dijkstra-trace
kind: trace
version: 2
level: 2
tags: [graphs, shortest-paths, heaps, tracing]
probes:
  1: { d1: "3", n: "3" }
requires:
  - interview-essentials/graph-dijkstra-worked
  - interview-essentials/graph-dijkstra-popped-final
  - interview-essentials/std-priority-queue-api
  - cpp-essentials/pair-basics
elaborate: Say in one sentence, as to an interviewer, why a stale entry costs a little time but never a wrong answer.
refs:
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue
---

One step of Dijkstra from 0 with a min-heap of (distance, vertex) pairs.
0 has already been popped. `99` stands for "unreached".
`for (auto [w, v] : adj[u])` visits each (weight, vertex) pair on u's
list.

```cpp
// directed, weight in brackets: 0→1 (4)  0→2 (1)  2→1 (2)  1→3 (1)  2→3 (5)
using P = std::pair<int, int>;
const std::vector<P> adj[4] = {{{4, 1}, {1, 2}}, {{1, 3}}, {{2, 1}, {5, 3}}, {}};   // (w, v)
int dist[4] = {0, 4, 1, 99};
std::priority_queue<P, std::vector<P>, std::greater<P>> pq;   // smallest first; holds (1, 2) (4, 1)
const int d = pq.top().first, u = pq.top().second; pq.pop();
if (d <= dist[u])
  for (auto [w, v] : adj[u])
    if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }
int d1 = dist[1], n = pq.size();   // @1
```

---

(1, 2) pops before (4, 1). The detour 0 → 2 → 1 costs 3, beating the
direct 4, so `dist[1]` drops and (3, 1) is pushed; 2 → 3 sets `dist[3]`
= 6 and pushes (6, 3). The old (4, 1) is **not removed**: the heap holds
3 entries, and (4, 1) will be skipped as stale when it pops.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
