---
id: graph-cycle-undirected-code
kind: code
version: 1
level: 3
tags: [graphs, dfs, cycles]
input: chips
choices:
  c1: ["v == parent", "seen[v]", "v == u", "false"]
compile:
  harness: |
    constexpr bool cyclic(std::array<std::array<int, 2>, 4> adj) {
      Graph g{adj};
      return g.has_cycle(0, -1);
    }
    static_assert(!cyclic({{{1, -1}, {0, 2}, {1, 3}, {2, -1}}}));   // path 0-1-2-3
    static_assert(cyclic({{{1, 3}, {0, 2}, {1, 3}, {2, 0}}}));      // square 0-1-2-3-0
    int main() {}
requires:
  - graph-cycle-directed-grey
refs:
  - https://en.wikipedia.org/wiki/Cycle_(graph_theory)#Cycle_detection
---

Undirected graph, DFS from 0. Complete the test for the neighbour that
must be skipped, so that a seen neighbour means "cycle".

```cpp
#include <array>
struct Graph {
  std::array<std::array<int, 2>, 4> adj;          // undirected, -1 = none
  std::array<bool, 4> seen{};
  constexpr bool has_cycle(int u, int parent) {
    seen[u] = true;
    for (int v : adj[u]) {
      if (v < 0 || {{c1::v == parent}}) continue;
      if (seen[v] || has_cycle(v, u)) return true;
    }
    return false;
  }
};
```

---

**Skip the edge you came in by.** An undirected edge u–v is stored in
both lists, so v always sees u again; that is not a cycle. Any *other*
seen neighbour is: there are two routes to it.

No grey colour is needed: undirected DFS has no cross edges, only tree
and back edges. Without the skip (`v == u`, `false`) the path 0-1-2-3
reports a cycle; skipping every `seen[v]` misses the square.
