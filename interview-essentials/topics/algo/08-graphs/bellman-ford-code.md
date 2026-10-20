---
id: graph-bellman-ford-code
kind: code
version: 1
level: 3
tags: [graphs, shortest-paths]
input: chips
choices:
  c1:
    - "dist[u] != INF && dist[u] + w < dist[v]"
    - "dist[u] + w < dist[v]"
    - "dist[u] != INF && w < dist[v]"
    - "dist[v] + w < dist[u]"
compile:
  harness: |
    constexpr std::array<std::array<int, 3>, 4> kChain{{{2, 3, -3}, {1, 2, 1}, {0, 1, 2}, {0, 3, 1}}};
    static_assert(bellman_ford(kChain, 0) == std::array<int, 4>{0, 2, 3, 0});
    // 2 and 3 are unreachable from 0; 2 has a negative edge out
    constexpr std::array<std::array<int, 3>, 4> kIsland{{{0, 1, 5}, {2, 3, -2}, {3, 2, 4}, {1, 0, 1}}};
    static_assert(bellman_ford(kIsland, 0) == std::array<int, 4>{0, 5, INF, INF});
    // the edge 1→3 (weight 1) is light but its route costs 6, more than 0→2→3 = 2
    constexpr std::array<std::array<int, 3>, 4> kLight{{{0, 1, 5}, {0, 2, 1}, {2, 3, 1}, {1, 3, 1}}};
    static_assert(bellman_ford(kLight, 0) == std::array<int, 4>{0, 5, 1, 2});
    int main() {}
requires:
  - graph-bellman-ford-rounds
  - cpp-essentials/structured-bindings-basics
  - stl-const-auto-param
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
elaborate: Say in one sentence, as to an interviewer, which vertices this loop would corrupt without the `INF` test, and why tests on a connected graph never show it.
---

Complete the relaxation test of Bellman-Ford on 4 vertices from `s`.
Each edge is `{u, v, w}`; `INF` marks a vertex not reached yet.

```cpp
#include <array>
constexpr int INF = 1000000;
constexpr std::array<int, 4> bellman_ford(const auto& edges, int s) {
  std::array<int, 4> dist{INF, INF, INF, INF};
  dist[s] = 0;
  for (int round = 0; round < 3; ++round)
    for (auto [u, v, w] : edges)
      if ({{c1::dist[u] != INF && dist[u] + w < dist[v]}}) dist[v] = dist[u] + w;
  return dist;
}
```

---

**Relax only from a reached `u`, when its route beats `v`'s current cost.**

Without `dist[u] != INF`, an unreached vertex with a negative edge
offers INF − 2, which is below INF, so a vertex nothing reaches gets a
junk cost. `w < dist[v]` compares the edge alone, not the path,
so a light edge at the end of a long route overwrites a cheaper `dist`.
`dist[v] + w < dist[u]` tests the edge backwards and never relaxes.
