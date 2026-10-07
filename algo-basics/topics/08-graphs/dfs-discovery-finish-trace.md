---
id: graph-dfs-discovery-finish-trace
kind: trace
version: 1
level: 2
tags: [graphs, dfs, tracing]
probes:
  1: { d: "1 2 6 3 0", f: "8 5 7 4 0" }
  2: { d: "1 2 6 3 9", f: "8 5 7 4 10" }
requires:
  - graph-bfs-and-dfs
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Depth-first_search#Vertex_orderings
---

A recursive DFS stamps each vertex with a discovery time `d` when it
starts and a finish time `f` when its whole subtree is done. `0` means
"not stamped yet". Give each array as five numbers, vertex 0 first.

```cpp
// directed: 0→1 0→2 1→3 2→3 4→2
const std::vector<int> adj[5] = {{1, 2}, {3}, {3}, {}, {2}};
int d[5], f[5], t = 0; bool seen[5] = {};
void dfs(int u) {
  seen[u] = true; d[u] = ++t;
  for (int v : adj[u]) if (!seen[v]) dfs(v);
  f[u] = ++t;
}
int main() {
  dfs(0);                                                // @1
  for (int u = 0; u < 5; ++u) if (!seen[u]) dfs(u);      // @2
}
```

---

The intervals nest: 3's [3, 4] sits inside 1's [2, 5], inside 0's
[1, 8]. An interval contains exactly its vertex's DFS descendants. 2
reaches 3 already finished, so 2 finishes at 7 without going deeper.
Vertex 4 is unreachable from 0; the outer loop restarts DFS there, and
its interval [9, 10] is disjoint from the rest.

Each vertex is stamped twice and each edge looked at once: O(V + E).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
