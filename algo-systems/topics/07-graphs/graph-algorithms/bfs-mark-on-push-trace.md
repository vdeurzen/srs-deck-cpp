---
id: graph-bfs-mark-on-push-trace
kind: trace
version: 1
level: 3
tags: [tracing, graphs, traversal, bugs]
probes:
  1: { head: "1", tail: "4" }
  2: { head: "2", tail: "6" }
  3: { head: "3", tail: "7" }
  4: { head: "7", tail: "7" }
requires:
  - algo-basics/graph-bfs-mark-on-push
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
---

```cpp
const std::vector<int> adj[4] = {{1, 2, 3}, {2, 3}, {3}, {}};   // marks on pop
int queue[16], head = 0, tail = 0; bool seen[4] = {};
void step() {
  const int u = queue[head++];
  if (seen[u]) return;
  seen[u] = true;
  for (int v : adj[u]) if (!seen[v]) queue[tail++] = v;
}
int main() {
  queue[tail++] = 0;
  step();                       // @1
  step();                       // @2
  step();                       // @3
  while (head < tail) step();   // @4
}
```

---

`tail` counts pushes. Four vertices, seven pushes: 2 and 3 are pushed
again by every frontier vertex that sees them before they are popped
and marked. Probes 2 and 3 are the duplicates going in; probe 4 pops
them, three of them for nothing. Marking at the push gives `tail == 4`.
On a dense graph the queue holds O(E) entries.

Verified by compiling and running this program under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`) and printing `head` and `tail` at
each probe.
