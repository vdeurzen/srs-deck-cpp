---
id: graph-components-code
kind: code
version: 1
level: 2
tags: [graphs, dfs, connectivity]
input: chips
choices:
  c1: ["!seen[s]", "seen[s]", "true", "s == 0"]
compile:
  harness: |
    constexpr int count(std::array<std::array<int, 2>, 6> adj) { G g{adj}; return g.components(); }
    // 0-1 1-2 | 3-4 | 5
    static_assert(count({{{1, -1}, {0, 2}, {1, -1}, {4, -1}, {3, -1}, {-1, -1}}}) == 3);
    // 0-1 1-2 2-3 3-4 4-5
    static_assert(count({{{1, -1}, {0, 2}, {1, 3}, {2, 4}, {3, 5}, {4, -1}}}) == 1);
    int main() {}
requires:
  - graph-vocabulary
  - graph-dfs-discovery-finish-trace
refs:
  - https://en.wikipedia.org/wiki/Component_(graph_theory)#Algorithms
---

Complete the test so `components()` returns the number of connected
components of this undirected graph.

```cpp
#include <array>
struct G {
  std::array<std::array<int, 2>, 6> adj;           // undirected, -1 = none
  std::array<bool, 6> seen{};
  constexpr void dfs(int u) { seen[u] = true; for (int v : adj[u]) if (v >= 0 && !seen[v]) dfs(v); }
  constexpr int components() {
    int count = 0;
    for (int s = 0; s < 6; ++s) if ({{c1::!seen[s]}}) { dfs(s); ++count; }
    return count;
  }
};
```

---

**Each search started from an unseen vertex marks exactly one new
component.** It reaches everything connected to `s` and nothing else,
so the count of starts is the count of components.

`true` starts a search at every vertex and counts 6; `s == 0` counts
only the first. Each vertex and edge is handled once overall: O(V + E).
