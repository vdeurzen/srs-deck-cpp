---
id: graph-degree-from-edge-list
kind: code
version: 1
level: 1
tags: [foundations, graphs, representation]
input: chips
choices:
  c1: ["++deg[u]; ++deg[v];", "++deg[u];", "++deg[u]; ++deg[u];", "deg[u] = deg[v] + 1;"]
compile:
  harness: |
    // 0-1 1-2 2-0 2-3; vertex 4 has no edge
    constexpr std::array<std::pair<int, int>, 4> kTri{{{0, 1}, {1, 2}, {2, 0}, {2, 3}}};
    static_assert(degrees(kTri) == std::array<int, 5>{2, 2, 3, 1, 0});
    // 0-4 1-4 2-4 3-4: a star around 4
    constexpr std::array<std::pair<int, int>, 4> kStar{{{0, 4}, {1, 4}, {2, 4}, {3, 4}}};
    static_assert(degrees(kStar) == std::array<int, 5>{1, 1, 1, 1, 4});
    int main() {}
requires:
  - graph-edge-ordered-pair
refs:
  - https://en.wikipedia.org/wiki/Edge_list
  - https://en.wikipedia.org/wiki/Degree_(graph_theory)
---

An undirected graph on vertices 0–4 is stored as an **edge list**: one
pair per edge, nothing else. Complete the loop so `deg[x]` ends up as
the number of edges touching `x`.

```cpp
#include <array>
#include <utility>
constexpr std::array<int, 5> degrees(const auto& edges) {
  std::array<int, 5> deg{};
  for (auto [u, v] : edges) { {{c1::++deg[u]; ++deg[v];}} }
  return deg;
}
```

---

An undirected edge touches **both** its endpoints, so each pair adds
one to two counters. Counting only `u` gives the out-degree of a
directed graph: the star's centre 4 would read 0.

The edge list is the plainest representation: E pairs of memory, but
finding the neighbours of one vertex means scanning all E.
