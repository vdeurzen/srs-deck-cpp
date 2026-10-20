---
id: graph-dfs-discovery-finish-trace
kind: trace
version: 3
level: 2
tags: [graphs, dfs, tracing]
probes:
  1: { "f[2]": "3", "d[1]": "4" }
requires:
  - graph-dfs-worked
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Depth-first_search#Vertex_orderings
elaborate: Sort the vertices by decreasing finish time. What order do you get on this graph, and which build tool would want it?
---

A recursive DFS stamps each vertex with a discovery time `d` when it
starts and a finish time `f` when everything it reaches is done, from one
counter `t`. `d[v] == 0` means v has not been started.

```cpp
// directed: 0→2 0→1, in that order
const std::vector<int> adj[3] = {{2, 1}, {}, {}};
int d[3] = {0, 0, 0}, f[3] = {0, 0, 0}, t = 0;
void dfs(int u) {
  ++t;
  d[u] = t;
  for (int v : adj[u])
    if (d[v] == 0) dfs(v);
  ++t;
  f[u] = t;
}
int main() {
  dfs(0);   // @1
}
```

---

0 is stamped 1 and enters 2 first, its first listed edge: 2 gets
[2, 3] and finishes, having nowhere to go. Only then does 0 try its
second edge, so 1 starts at 4, after 2's finish: `f[2]` = 3, `d[1]` = 4.
1 closes at 5 and 0 at 6.

The intervals nest: 0's [1, 6] contains both children's, and siblings'
intervals never overlap. Each vertex is stamped twice and each edge
looked at once: O(V + E).

(Values from running it under GCC 16.2.)
