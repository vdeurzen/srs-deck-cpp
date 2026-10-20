---
id: graph-directed-storage-trace
kind: trace
version: 2
level: 1
tags: [foundations, graphs, representation, tracing]
probes:
  1: { a: "1", b: "2" }
requires:
  - interview-essentials/graph-edge-ordered-pair
  - interview-essentials/graph-list-from-edges-chunk
  - cpp-essentials/iter-range-for-intro
elaborate: Which of your own data has one-way links, such as follows or imports, and which list would answer "who points at me?"
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list
  - https://en.wikipedia.org/wiki/Directed_graph
---

The same two pairs are stored twice: `out` reads each pair as a
directed edge u → v, `both` as an undirected edge u – v.

```cpp
const std::pair<int, int> edges[2] = {{1, 2}, {2, 0}};
std::vector<int> out[3], both[3];
for (auto [u, v] : edges) {
  out[u].push_back(v);
  both[u].push_back(v); both[v].push_back(u);
}
int a = out[2].size(), b = both[2].size();   // @1
```

---

`out[2]` holds only 0, from the arrow 2 → 0; the arrow 1 → 2 points
*into* 2, so it lives in 1's list. `both[2]` holds 1 and 0: an
undirected edge is written once from each end. Directed storage holds E
entries, undirected 2E.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
