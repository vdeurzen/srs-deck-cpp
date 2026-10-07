---
id: graph-kruskal-code
kind: code
version: 1
level: 3
tags: [graphs, mst, union-find, greedy]
input: chips
choices:
  c1: ["find(u) != find(v)", "find(u) == find(v)", "u != v", "parent[u] != parent[v]"]
compile:
  harness: |
    // 0-1 (1)  1-2 (2)  0-2 (3)  2-3 (4)  1-3 (5)  0-3 (6)
    static_assert(kruskal({{{1, 0, 1}, {2, 1, 2}, {3, 0, 2}, {4, 2, 3}, {5, 1, 3}, {6, 0, 3}}}) == 7);
    int main() {}
requires:
  - graph-mst-cut-property
  - graph-union-find-path-compression
refs:
  - https://doi.org/10.1090/S0002-9939-1956-0078686-7
  - https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
---

Kruskal's MST on 4 vertices. The edges arrive sorted by weight,
lightest first. Complete the test that decides whether to take an edge.

```cpp
#include <array>
struct Edge { int w, u, v; };
// called with 0-1 (1)  1-2 (2)  0-2 (3)  2-3 (4)  1-3 (5)  0-3 (6)
constexpr int kruskal(const std::array<Edge, 6>& sorted_edges) {
  std::array<int, 4> parent{0, 1, 2, 3};
  auto find = [&](int x) { while (parent[x] != x) x = parent[x]; return x; };
  int total = 0;
  for (auto [w, u, v] : sorted_edges)
    if ({{c1::find(u) != find(v)}}) { parent[find(u)] = find(v); total += w; }
  return total;
}
```

---

**Take an edge only if its ends are in different trees.** Same root
means the edge would close a cycle. Different roots: the edge is the
lightest one crossing the cut between that tree and the rest, so the cut
property says it belongs in the MST.

Here 0-2 (3) is rejected and the total is 1 + 2 + 4 = 7. `u != v` takes
all six; comparing `parent[]` entries tests neighbours, not roots. With
union by rank and path compression the finds are nearly O(1), so the
sort dominates: O(E log E).
