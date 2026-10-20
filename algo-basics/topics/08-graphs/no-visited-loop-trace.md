---
id: graph-no-visited-loop-trace
kind: trace
version: 1
level: 2
tags: [foundations, graphs, traversal, tracing, bugs]
probes:
  1: { stack: "1 0 1", popped: "02" }
  2: { stack: "1 0 0 0 1", popped: "0212" }
requires:
  - interview-essentials/graph-cycle-spot
  - graph-stack-walk-code
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
elaborate: Where in your own code does a work list re-add items it has already handled — a crawler, a dependency resolver, a retry queue?
---

A stack-based walk over a triangle that keeps **no record of visited
vertices**. Give `stack` bottom first.

```cpp
// undirected: 0-1 1-2 2-0
const std::vector<int> adj[3] = {{1, 2}, {0, 2}, {0, 1}};
std::vector<int> stack = {0};
std::string popped;
void step() {
  const int u = stack.back(); stack.pop_back();
  popped += char('0' + u);
  for (int v : adj[u]) stack.push_back(v);
}
int main() {
  step(); step();   // @1
  step(); step();   // @2
}
```

---

Every pop pushes two vertices, so the stack grows by one per step and
never empties: `while (!stack.empty()) step();` would never return. The
walk keeps re-entering the cycle, and in an undirected graph even a
single edge u–v is a way back, since v lists u.

Add a `seen` check at the pop (skip a vertex already seen; push only
unseen neighbours) and the walk ends after exactly 4 pops: 0, 2, 1, then
a second copy of 1, pushed by both 0 and 2, which is skipped.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
