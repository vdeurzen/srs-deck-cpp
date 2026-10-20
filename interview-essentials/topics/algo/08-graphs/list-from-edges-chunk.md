---
id: graph-list-from-edges-chunk
kind: chunk
version: 2
level: 1
tags: [foundations, graphs, representation]
expose_ms: 9500
requires:
  - graph-directed-vs-undirected
  - cpp-essentials/structured-bindings-basics
  - cpp-essentials/vector-of-vectors
compile: null # a fragment: n and edges are declared by the surrounding code
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list
  - https://en.cppreference.com/w/cpp/container/vector
elaborate: Where else have you turned a flat list of pairs into one list per key, and what played the role of `adj(n)` there?
---

An undirected graph has `n` vertices; `edges` holds one pair (u, v) per
edge, and `for (auto [u, v] : edges)` runs once per pair.

```cpp
std::vector<std::vector<int>> adj(n);
for (auto [u, v] : edges) {
  adj[u].push_back(v);
  adj[v].push_back(u);
}
```

---

**Building an adjacency list from an edge list.** One vector per vertex
holds that vertex's neighbours. `adj(n)` creates all n lists up front,
so a vertex with no edge still has an (empty) list. Each undirected
edge is pushed twice, once from each end; drop the second push and the
graph becomes directed.

Cost: V lists plus 2E entries, and the neighbours of `u` are exactly
`adj[u]`, read in deg(u) steps.
