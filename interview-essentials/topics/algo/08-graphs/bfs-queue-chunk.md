---
id: graph-bfs-queue-chunk
kind: chunk
version: 3
level: 1
tags: [foundations, graphs, traversal, bfs]
expose_ms: 12000
compile: null # a fragment (q, seen, adj undeclared); std::queue is not constexpr in GCC 14
requires:
  - graph-bfs-trace
  - graph-bfs-mark-on-push
  - cpp-essentials/iter-range-for-const-auto-ref
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
  - https://en.cppreference.com/w/cpp/container/queue
elaborate: Swap the queue for a stack in this loop. In what order would the vertices leave it, and where have you seen that order before?
---

The body of a BFS's `while (!q.empty())` loop. `q` is a
`std::queue<int>`, `adj[u]` is u's adjacency list, and `seen[v]` records
that v has been queued.

```cpp
int u = q.front();
q.pop();
for (int v : adj[u]) {
  if (seen[v]) continue;
  seen[v] = true;
  q.push(v);
}
```

---

**One breadth-first search step.** Read the oldest vertex, then pop it:
`pop()` returns nothing. Each neighbour not yet queued is marked and
pushed together, so no vertex enters the queue twice; marking at the pop
instead lets the queue fill with duplicates.
