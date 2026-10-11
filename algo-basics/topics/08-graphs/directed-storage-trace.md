---
id: graph-directed-storage-trace
kind: trace
version: 1
level: 1
tags: [foundations, graphs, representation, tracing]
probes:
  1: { "out[2]": "0", "both[2]": "1 0", "both[0]": "1 2" }
requires:
  - graph-edge-ordered-pair
  - graph-list-from-edges-chunk
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list
  - https://en.wikipedia.org/wiki/Directed_graph
---

The same three pairs are stored twice: `out` reads each pair as a
directed edge u → v, `both` as an undirected edge u – v. Give each list
in insertion order.

```cpp
const std::pair<int, int> edges[3] = {{0, 1}, {1, 2}, {2, 0}};
std::vector<int> out[3], both[3];
int main() {
  for (auto [u, v] : edges) {
    out[u].push_back(v);
    both[u].push_back(v); both[v].push_back(u);
  }
  // @1
}
```

---

`out[2]` holds only 0, from the arrow 2 → 0; the arrow 1 → 2 points
*into* 2, so it lives in 1's list. `both[2]` sees both edges that touch
2. Directed storage holds E entries, undirected 2E: each undirected
edge is written once from each end.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
