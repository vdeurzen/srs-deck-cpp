---
id: graph-topo-dfs-reverse-finish
kind: code
version: 1
level: 3
tags: [graphs, dfs, topological-sort]
input: chips
choices:
  c1: ["4 - n++", "n++", "4 - n", "u"]
compile:
  harness: |
    // 0→1 1→2 3→1 3→4 4→2
    constexpr std::array<int, 5> sorted() {
      Dag g{{{{1, -1}, {2, -1}, {-1, -1}, {1, 4}, {2, -1}}}};
      for (int u = 0; u < 5; ++u) if (!g.seen[u]) g.dfs(u);
      return g.order;
    }
    static_assert(sorted() == std::array<int, 5>{3, 4, 0, 1, 2});
    int main() {}
requires:
  - graph-dfs-discovery-finish-trace
  - graph-topo-order
refs:
  - https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
  - https://doi.org/10.1137/0201010
---

This DFS writes each vertex into `order` at the moment it finishes.
Choose the slot so that `order` ends up topologically sorted: for every
edge `a → b`, a comes first.

```cpp
#include <array>
struct Dag {
  std::array<std::array<int, 2>, 5> adj;          // out-neighbours, -1 = none
  std::array<bool, 5> seen{};
  std::array<int, 5> order{}; int n = 0;
  constexpr void dfs(int u) {
    seen[u] = true;
    for (int v : adj[u]) if (v >= 0 && !seen[v]) dfs(v);
    order[{{c1::4 - n++}}] = u;
  }
};
```

---

**Reverse finish order is a topological order.** When `u` finishes,
everything reachable from it has already finished, so every successor
was written before `u`. Filling from the back puts `u` ahead of them.

The finish order itself (`n++`) is the classic slip: here it gives
2 1 0 4 3, with every edge pointing backwards. `4 - n` never advances
and overwrites one slot. O(V + E), the cost of the DFS.
