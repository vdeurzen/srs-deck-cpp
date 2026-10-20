---
id: graph-no-visited-loop-trace
kind: trace
version: 2
level: 2
tags: [foundations, graphs, traversal, tracing, bugs]
probes:
  1: { n: "3", mid: "0" }
requires:
  - interview-essentials/graph-cycle-spot
  - graph-stack-walk-code
  - cpp-essentials/iter-range-for-intro
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
elaborate: Where in your own code does a work list re-add items it has already handled — a crawler, a dependency resolver, a retry queue?
---

A stack-based walk over a triangle that keeps **no record of visited
vertices**. `stack[0]` is the bottom of the stack.

```cpp
// undirected: 0-1 1-2 2-0
const std::vector<int> adj[3] = {{1, 2}, {0, 2}, {0, 1}};
std::vector<int> stack = {0};
void step() {
  const int u = stack.back(); stack.pop_back();
  for (int v : adj[u]) stack.push_back(v);
}
int main() {
  step(); step();
  int n = stack.size(), mid = stack[1];   // @1
}
```

---

Step 1 pops 0 and pushes 1 and 2. Step 2 pops 2 and pushes 0 and 1: the
stack is `1 0 1`, and **0, already handled, is back on it**. Every pop
pushes two vertices, so the stack grows by one per step and
`while (!stack.empty()) step();` would never return.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
