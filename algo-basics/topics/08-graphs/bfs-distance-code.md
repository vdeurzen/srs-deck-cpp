---
id: graph-bfs-distance-code
kind: code
version: 1
level: 2
tags: [graphs, traversal, shortest-paths]
input: chips
choices:
  c1: ["dist[u] + 1", "dist[v] + 1", "dist[u]", "u + 1"]
compile:
  harness: |
    // 0-1 0-2 1-3 2-3 2-4 3-5 4-5, undirected
    constexpr std::array<std::array<int, 3>, 6> kG{{{1, 2, -1}, {0, 3, -1}, {0, 3, 4}, {1, 2, 5}, {2, 5, -1}, {3, 4, -1}}};
    static_assert(bfs(kG, 0) == std::array<int, 6>{0, 1, 1, 2, 2, 3});
    static_assert(bfs(kG, 5) == std::array<int, 6>{3, 2, 2, 1, 1, 0});
    int main() {}
requires:
  - graph-bfs-why-shortest
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
---

Complete the line that records how many edges `v` is from `s`.

```cpp
#include <array>
constexpr std::array<int, 6> bfs(const auto& adj, int s) {   // -1 pads adj[u]
  std::array<int, 6> dist{-1, -1, -1, -1, -1, -1}, queue{s}; dist[s] = 0;
  for (int head = 0, tail = 1; head < tail;) {
    const int u = queue[head++];
    for (int v : adj[u])
      if (v != -1 && dist[v] == -1) { dist[v] = {{c1::dist[u] + 1}}; queue[tail++] = v; }
  }
  return dist;
}
```

---

`v` is discovered from `u`, one edge further out, so it is one more than
`u`'s distance: the queue order guarantees `u` is a nearest discoverer.
`dist[v] + 1` reads −1 + 1 = 0; `dist[u]` leaves every vertex at 0;
`u + 1` confuses a vertex's name with its distance.
