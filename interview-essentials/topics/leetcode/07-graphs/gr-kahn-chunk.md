---
id: gr-kahn-chunk
kind: chunk
version: 1
level: 3
tags: [graphs, topological-sort, kahn, lc-207, lc-210]
expose_ms: 10000
compile:
  harness: |
    #include <array>
    constexpr bool courses() {   // 0 before 1 and 2, both before 3
      const std::vector<int> adj[4] = {{1, 2}, {3}, {3}, {}};
      return topo(adj, std::array{0, 1, 1, 2}) == std::vector{0, 1, 2, 3};
    }
    static_assert(courses());
    constexpr bool cycle() {     // 1 -> 2 -> 1; 0 and 3 are free
      const std::vector<int> adj[4] = {{1}, {2}, {1}, {}};
      return topo(adj, std::array{0, 2, 1, 0}) == std::vector{0, 3};
    }
    static_assert(cycle());
    int main() {}
requires:
  - graph-kahn-trace
refs:
  - https://leetcode.com/problems/course-schedule-ii/
  - https://doi.org/10.1145/368996.369025
  - https://cp-algorithms.com/graph/topological-sort.html
elaborate: LC 207 only asks whether all courses can be finished. Which single comparison on the result answers it, and what does LC 210 return when it fails?
---

```cpp
#include <vector>
constexpr std::vector<int> topo(const auto& adj, auto indeg) {     // indeg by value: it is used up
  std::vector<int> order;
  for (int v = 0; v < int(indeg.size()); ++v) if (indeg[v] == 0) order.push_back(v);
  for (std::size_t h = 0; h < order.size(); ++h)                    // order doubles as the queue
    for (int v : adj[order[h]]) if (--indeg[v] == 0) order.push_back(v);
  return order;                                                     // shorter than V: a cycle
}
```

---

**Kahn's algorithm with the output as its own queue.** Before `h`:
popped, out-edges removed. From `h` on: ready, waiting to be popped.
Seed with every in-degree-0 vertex, then each pop removes the vertex's
out-edges and appends whatever that frees. O(V + E), no recursion, so
no stack overflow on a long dependency chain, which a recursive DFS sort
risks.

The cycle check is free: a vertex on a cycle never reaches in-degree 0,
so `order.size() < V`. The decrement-and-test `--indeg[v] == 0` appends
each vertex exactly once, on its last incoming edge. On LC, `std::queue<int> q` plus
`order.push_back` is the same loop.
