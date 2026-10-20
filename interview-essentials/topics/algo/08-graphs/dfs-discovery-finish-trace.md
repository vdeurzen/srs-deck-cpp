---
id: graph-dfs-discovery-finish-trace
kind: trace
version: 4
level: 2
tags: [graphs, dfs, tracing]
probes:
  1: { "done[0]": "1", "done[1]": "2" }
requires:
  - graph-dfs-worked
  - graph-edge-ordered-pair
  - cpp-essentials/vector-basics
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Depth-first_search#Vertex_orderings
elaborate: Read `done` backwards. What order do you get, and why does it respect every edge of this graph?
---

A recursive DFS from 0 appends each vertex to `done` when its call
finishes, after everything it reaches is done.

```cpp
// directed: 0→1 0→2 2→1, in that order
std::vector<int> adj[3] = {{1, 2}, {}, {1}};
bool seen[3] = {false, false, false};
std::vector<int> done;
void dfs(int u) {
  seen[u] = true;
  for (int v : adj[u])
    if (!seen[v]) dfs(v);
  done.push_back(u);
}
int main() {
  dfs(0);   // @1
}
```

---

0 enters 1 first, its first listed edge. 1 has no out-edge, so it
finishes at once: `done[0]` = 1. Then 0 enters 2, whose edge to 1 finds
1 already seen, so 2 finishes next: `done[1]` = 2, and 0 last.

So each vertex lands in `done` after every vertex it points to: 1
before both 0 and 2, 2 before 0.

(Values from running it under GCC 16.2.)
