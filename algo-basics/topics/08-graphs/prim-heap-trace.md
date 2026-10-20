---
id: graph-prim-heap-trace
kind: trace
version: 2
level: 3
tags: [graphs, mst, heaps, tracing]
probes:
  1: { k: "1", n: "3" }
requires:
  - graph-prim-trace
  - heap-stale-entries-code
  - interview-essentials/std-priority-queue-api
  - cpp-essentials/pair-basics
elaborate: Say in one sentence, as to an interviewer, why leaving stale entries in the heap is cheaper than updating them.
refs:
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
  - https://en.wikipedia.org/wiki/Prim%27s_algorithm#Time_complexity
---

One step of Prim's MST with a min-heap of (edge weight, vertex)
entries. Vertex 0 is in the tree and its two edges are queued. An entry
for a vertex already in the tree is stale. `for (auto [w, v] : adj[u])`
visits each (weight, vertex) pair on u's list.

```cpp
// undirected: 0-1 (2) 0-2 (3) 1-2 (1) 1-3 (4) 2-3 (5)
using P = std::pair<int, int>;
const std::vector<P> adj[4] = {{{2, 1}, {3, 2}}, {{2, 0}, {1, 2}, {4, 3}},
                               {{3, 0}, {1, 1}, {5, 3}}, {{4, 1}, {5, 2}}};   // (w, v)
bool in[4] = {true, false, false, false};
int total = 0;
std::priority_queue<P, std::vector<P>, std::greater<P>> pq;   // holds (2, 1) (3, 2)
const int key = pq.top().first, u = pq.top().second; pq.pop();
if (!in[u]) {
  in[u] = true; total += key;
  for (auto [w, v] : adj[u]) if (!in[v]) pq.push({w, v});
}
int k = pq.top().first, n = pq.size();   // @1
```

---

(2, 1) pops: 1 joins at cost 2 and pushes (1, 2) and (4, 3), skipping 0.
The new top is (1, 2): the key pushed is the **edge weight** 1, not a
path length. The old (3, 2) stays, so the heap holds 3 entries; once 2
has joined, (3, 2) will pop as stale and be skipped. Each edge pushes at
most twice: O(E log V).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
