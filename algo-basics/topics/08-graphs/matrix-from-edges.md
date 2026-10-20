---
id: graph-matrix-from-edges
kind: code
version: 1
level: 1
tags: [foundations, graphs, representation]
input: chips
choices:
  c1: ["m[v][u] = true", "m[u][u] = true", "m[v][v] = true", "m[u][v] = false"]
compile:
  harness: |
    // 0-1 1-3 2-3, undirected
    constexpr std::array<std::pair<int, int>, 3> kE{{{0, 1}, {1, 3}, {2, 3}}};
    constexpr Matrix kM = to_matrix(kE);
    static_assert(kM[0][1] && kM[1][0] && kM[1][3] && kM[3][1] && kM[2][3] && kM[3][2]);
    static_assert(!kM[0][0] && !kM[1][1] && !kM[2][2] && !kM[3][3] && !kM[0][2]);
    int main() {}
requires:
  - interview-essentials/graph-edge-ordered-pair
refs:
  - https://en.wikipedia.org/wiki/Adjacency_matrix
---

An **adjacency matrix** stores a graph on V vertices as a V × V grid of
bits: row `a`, column `b` is set when there is an edge from `a` to `b`.
Complete the build for an *undirected* graph.

```cpp
#include <array>
#include <utility>
using Matrix = std::array<std::array<bool, 4>, 4>;
constexpr Matrix to_matrix(const auto& edges) {
  Matrix m{};
  for (auto [u, v] : edges) { m[u][v] = true; {{c1::m[v][u] = true}}; }
  return m;
}
```

---

An undirected edge goes both ways, so it sets two cells and the matrix
is symmetric about its diagonal. Without the mirror write you have
built a directed graph. The diagonal stays clear: no vertex here has an
edge to itself.

Cost: V² bits whatever E is; "is a–b an edge?" is one lookup.
