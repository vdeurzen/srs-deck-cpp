---
id: gr-kahn-chunk
kind: chunk
version: 2
level: 3
tags: [graphs, topological-sort, kahn, lc-207, lc-210]
expose_ms: 12000
compile: null # a function body
requires:
  - graph-kahn-trace
  - cpp-essentials/cast-functional-notation
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/course-schedule/
  - https://leetcode.com/problems/course-schedule-ii/
  - https://doi.org/10.1145/368996.369025
  - https://cp-algorithms.com/graph/topological-sort.html
elaborate: Course Schedule (LC 207) only asks whether all courses can be finished, given prerequisite pairs. Which single comparison on the result answers it, and what does Course Schedule II (LC 210), which returns a valid order, return when there is none?
---

`order` doubles as the queue: `h` is the index of its head.

```cpp
std::vector<int> order;
for (int v = 0; v < int(indeg.size()); ++v)
  if (indeg[v] == 0) order.push_back(v);
for (std::size_t h = 0; h < order.size(); ++h)
  for (int v : adj[order[h]])
    if (--indeg[v] == 0) order.push_back(v);
return order;
```

---

**Kahn's algorithm with the output as its own queue.** Before `h`:
popped, out-edges removed. From `h` on: ready, waiting to be popped.
Seed with every in-degree-0 vertex, then each pop removes the vertex's
out-edges and appends whatever that frees. O(V + E), no recursion.

The cycle check is free: a vertex on a cycle never reaches in-degree 0,
so `order.size() < V`. The decrement-and-test `--indeg[v] == 0` appends
each vertex exactly once, on its last incoming edge. On LeetCode,
`std::queue<int> q` plus `order.push_back` is the same loop. `indeg` is a copy: the loop uses it up.
