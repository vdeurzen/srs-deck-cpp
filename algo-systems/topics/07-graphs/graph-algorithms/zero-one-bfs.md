---
id: graph-zero-one-bfs
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths]
requires:
  - graph-bfs-and-dfs
refs:
  - https://cp-algorithms.com/graph/01_bfs.html
---

## Every edge weighs 0 or 1. 0-1 BFS replaces Dijkstra's heap with a deque. Which end of the deque must a vertex reached by a 0-edge go to?

```cpp
if (dist[u] + w < dist[v]) {
  dist[v] = dist[u] + w;
  /* push v to one end of dq, depending on w */
}
```

---

**The front (a 1-edge goes to the back): the deque stays sorted by distance.**

The deque only ever holds distances d and d + 1, front first, so the
front is always a minimum, as a heap would give, in O(1). Total
O(V + E) instead of O((V + E) log V).
