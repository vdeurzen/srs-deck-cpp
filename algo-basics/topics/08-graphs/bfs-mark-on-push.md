---
id: graph-bfs-mark-on-push
kind: basic
version: 1
level: 2
tags: [graphs, traversal, bugs]
requires:
  - graph-bfs-trace
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
elaborate: Where else does "mark when you enqueue, not when you process" apply — a work list, a crawler, a job queue?
---

## This BFS marks a vertex when it is *popped*. It still visits each vertex once. What does it cost on a dense graph?

```cpp
while (head < tail) {
  const int u = queue[head++];
  if (seen[u]) continue;
  seen[u] = true;
  for (int v : adj[u]) if (!seen[v]) queue[tail++] = v;
}
```

---

**The queue grows to O(E) entries instead of O(V): duplicates.**

A vertex next to many frontier vertices is pushed once per such edge
before its first pop marks it. Marking `seen[v]` at the push lets each
vertex enter once. Small tests never show it; dense graphs pay in
memory and time.
