---
id: graph-bellman-ford-trace
kind: trace
version: 2
level: 3
tags: [graphs, shortest-paths, tracing]
probes:
  1: { "dist[2]": "99", "dist[3]": "4" }
requires:
  - graph-bellman-ford-worked
  - interview-essentials/graph-bellman-ford-rounds
  - cpp-essentials/structured-bindings-basics
  - cpp-essentials/iter-range-for-intro
elaborate: How many rounds does this edge order need before dist[3] is final, and which order would need only one?
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---

One Bellman-Ford round from 0. `Edge` is a struct of three ints, and
`99` stands for "unreached". Note the order the edges are listed in.

```cpp
struct Edge { int u, v, w; };
const Edge edges[] = {{2, 3, -2}, {1, 2, 1}, {0, 1, 2}, {0, 3, 4}};
int dist[4] = {0, 99, 99, 99};
for (auto [u, v, w] : edges)
  if (dist[u] != 99 && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
// @1
```

---

The list runs back to front along the path 0 → 1 → 2 → 3. Edges 2 → 3
and 1 → 2 come before their tails have distances, so both are skipped;
then 0 → 1 sets `dist[1]` = 2, and 0 → 3 sets `dist[3]` = 4 directly.
2 stays unreached: **one round settled only the paths it happened to
walk in order**.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
