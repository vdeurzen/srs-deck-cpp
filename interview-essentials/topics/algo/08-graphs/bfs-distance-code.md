---
id: graph-bfs-distance-code
kind: code
version: 1
level: 2
tags: [graphs, traversal, shortest-paths]
input: chips
choices:
  c1: ["dist[u] + 1", "dist[v] + 1", "dist[u]", "head + 1"]
compile:
  harness: |
    // 0-1 0-2 1-3 2-3 2-4 3-5 4-5, undirected
    constexpr std::array<std::array<int, 3>, 6> kG{{{1, 2, -1}, {0, 3, -1}, {0, 3, 4}, {1, 2, 5}, {2, 5, -1}, {3, 4, -1}}};
    static_assert(bfs(kG, 0) == std::array<int, 6>{0, 1, 1, 2, 2, 3});
    static_assert(bfs(kG, 5) == std::array<int, 6>{3, 2, 2, 1, 1, 0});
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
requires:
  - graph-bfs-trace
  - cpp-essentials/iter-array-fixed-size
  - cpp-essentials/constexpr-fn-static-assert
elaborate: Say in one sentence, as to an interviewer, why this distance would be wrong if the queue were a stack.
---

Complete the line that records how many edges `v` is from `s`. Each
`adj[u]` lists u's neighbours, padded with −1 to three slots, and
`for (int v : adj[u])` visits its slots in order.

```cpp
#include <array>
constexpr std::array<int, 6> bfs(std::array<std::array<int, 3>, 6> adj, int s) {
  std::array<int, 6> dist{-1, -1, -1, -1, -1, -1}, queue{s};  dist[s] = 0;
  for (int head = 0, tail = 1; head < tail; ++head) {
    int u = queue[head];
    for (int v : adj[u])
      if (v != -1 && dist[v] == -1) { dist[v] = {{c1::dist[u] + 1}}; queue[tail] = v; ++tail; }
  }
  return dist;
}
```

---

`v` is discovered from `u`, one edge further out, so it is one more than
`u`'s distance: the queue order guarantees `u` is a nearest discoverer.
`dist[v] + 1` reads −1 + 1 = 0; `dist[u]` leaves every vertex at 0.
`head + 1` is u's place in the queue plus one, not its distance: from 0,
vertex 4 is found while popping the third entry and would get 3, not 2.
