---
id: graph-list-from-edges-chunk
kind: chunk
version: 1
level: 1
tags: [foundations, graphs, representation]
expose_ms: 9000
compile:
  harness: |
    #include <array>
    #include <utility>
    // 0-1 1-2 1-3, undirected
    constexpr std::array<std::pair<int, int>, 3> kE{{{0, 1}, {1, 2}, {1, 3}}};
    static_assert(adjacency(4, kE)[1].size() == 3);
    static_assert(adjacency(4, kE)[0].size() == 1 && adjacency(4, kE)[0][0] == 1);
    static_assert(adjacency(4, kE)[3].size() == 1 && adjacency(4, kE)[3][0] == 1);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list
  - https://en.cppreference.com/w/cpp/container/vector
---

```cpp
#include <vector>
constexpr auto adjacency(int n, const auto& edges) {
  std::vector<std::vector<int>> adj(n);
  for (auto [u, v] : edges) { adj[u].push_back(v); adj[v].push_back(u); }
  return adj;
}
```

---

**Building an adjacency list from an edge list.** One vector per vertex
holds that vertex's neighbours. `adj(n)` creates all n lists up front,
so a vertex with no edge still has an (empty) list. Each undirected
edge is pushed twice, once from each end; drop the second push and the
graph becomes directed.

Cost: V lists plus 2E entries, and the neighbours of `u` are exactly
`adj[u]`, read in deg(u) steps.
