---
id: graph-traversal-work-trace
kind: trace
version: 1
level: 2
tags: [foundations, graphs, traversal, complexity, tracing]
probes:
  1: { pushes: "4", checks: "3" }
  2: { pushes: "5", checks: "14" }
requires:
  - graph-degree-from-edge-list
  - graph-bfs-queue-chunk
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
---

Breadth-first search, instrumented: `pushes` counts vertices entering
the queue, `checks` counts neighbour tests. V = 5, E = 7. Probe 1
fires once, after vertex 0's list is done.

```cpp
// undirected: 0-1 0-2 0-3 1-2 1-3 2-3 3-4
const std::vector<int> adj[5] = {{1, 2, 3}, {0, 2, 3}, {0, 1, 3}, {0, 1, 2, 4}, {3}};
bool seen[5] = {true};
std::queue<int> q;
int pushes = 1, checks = 0;   // 0 starts in the queue
int main() {
  q.push(0);
  while (!q.empty()) {
    const int u = q.front(); q.pop();
    for (int v : adj[u]) {
      ++checks;
      if (!seen[v]) { seen[v] = true; q.push(v); ++pushes; }
    }
    if (u == 0) {}   // @1
  }
  return 0;          // @2
}
```

---

After 0 alone, `checks` is deg(0) = 3 and 0's three neighbours are
queued. Each vertex is pushed and popped once, so `pushes` is V = 5. Each popped
vertex scans its whole list once, so `checks` is the sum of the
degrees, 3 + 3 + 3 + 4 + 1 = 14 = 2E. Total work V + 2E: O(V + E).

Most checks fail here; on a dense graph the 2E term dominates.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
