---
id: graph-bfs-queue-chunk
kind: chunk
version: 1
level: 1
tags: [foundations, graphs, traversal, bfs]
expose_ms: 10000
compile: null # a fragment (seen, adj, s undeclared); std::queue is not constexpr in GCC 14
requires:
  - graph-list-from-edges-chunk
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
  - https://en.cppreference.com/w/cpp/container/queue
---

```cpp
std::queue<int> q;
q.push(s); seen[s] = true;
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : adj[u])
    if (!seen[v]) { seen[v] = true; q.push(v); }
}
```

---

**Breadth-first search from `s`.** The queue is first-in first-out, so
vertices leave in the order they were found: all of `s`'s neighbours,
then theirs, ring by ring. `seen[v] = true` happens on the push, so no
vertex is ever in the queue twice. `adj[u]` is `u`'s adjacency list.
