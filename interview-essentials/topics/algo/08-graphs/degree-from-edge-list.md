---
id: graph-degree-from-edge-list
kind: code
version: 1
level: 1
tags: [foundations, graphs, representation]
input: chips
choices:
  c1: ["deg[u] += 1; deg[v] += 1;", "deg[u] += 1; deg[u] += 1;", "deg[v] += 1;", "deg[u] += 1;"]
compile:
  harness: |
    // 0-1 1-2 2-0 2-3; vertex 4 has no edge
    static_assert(degrees({0, 1, 2, 2}, {1, 2, 0, 3}) == std::array<int, 5>{2, 2, 3, 1, 0});
    // 0-4 1-4 2-4 3-4: a star around 4
    static_assert(degrees({0, 1, 2, 3}, {4, 4, 4, 4}) == std::array<int, 5>{1, 1, 1, 1, 4});
    int main() {}
requires:
  - graph-edge-ordered-pair
  - stl-array-brace-zero
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://en.wikipedia.org/wiki/Edge_list
  - https://en.wikipedia.org/wiki/Degree_(graph_theory)
elaborate: What does the sum of all the degrees always equal, and which line of this loop shows why?
---

An undirected graph on vertices 0–4 is stored as an **edge list**: edge
`e` is the pair `from[e]`, `to[e]`, and nothing else is stored. Complete
the loop so that `deg[x]` = edges touching `x`.

```cpp
#include <array>
constexpr std::array<int, 5> degrees(std::array<int, 4> from, std::array<int, 4> to) {
  std::array<int, 5> deg{};
  for (int e = 0; e < 4; ++e) {
    const int u = from[e], v = to[e];
    {{c1::deg[u] += 1; deg[v] += 1;}}
  }
  return deg;
}
```

---

An undirected edge touches **both** its endpoints, so each edge adds
one to two counters. Counting only `u` gives the out-degree of a
directed graph: the star's centre 4 would read 0, and counting only `v`
leaves 0 to 3 at 0. Adding 1 twice at `u` counts both ends at one of them.

The edge list is the plainest representation: E pairs of ints, but
finding the neighbours of one vertex means scanning all E.
