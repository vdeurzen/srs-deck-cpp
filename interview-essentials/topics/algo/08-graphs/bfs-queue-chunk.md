---
id: graph-bfs-queue-chunk
kind: chunk
version: 2
level: 1
tags: [foundations, graphs, traversal, bfs]
expose_ms: 12000
compile: null # a fragment (q, seen, adj, s, enqueue undeclared); std::queue is not constexpr in GCC 14
requires:
  - graph-bfs-trace
  - cpp-essentials/iter-range-for-const-auto-ref
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
  - https://en.cppreference.com/w/cpp/container/queue
elaborate: Swap the queue for a stack in this loop. In what order would the vertices leave it, and where have you seen that order before?
---

`s` is the start vertex, `q` a `std::queue<int>`, and `seen[v]` records
that v has been queued: `enqueue(v)` sets `seen[v] = true`, then pushes
v onto `q`.

```cpp
enqueue(s);
while (!q.empty()) {
  int u = q.front();
  q.pop();
  for (int v : adj[u])
    if (!seen[v]) enqueue(v);
}
```

---

**Breadth-first search from `s`.** The queue is first-in first-out, so
vertices leave in the order they were found: all of `s`'s neighbours,
then theirs, ring by ring. `enqueue` marks a vertex as it is pushed, so
no vertex is ever in the queue twice. `adj[u]` is `u`'s adjacency list.
