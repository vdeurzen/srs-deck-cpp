---
id: graph-dfs-call-stack-trace
kind: trace
version: 1
level: 2
tags: [foundations, graphs, traversal, dfs, tracing]
probes:
  1: { path: "034", order: "034" }
  2: { path: "012", order: "03412" }
requires:
  - graph-list-from-edges-chunk
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Depth-first_search
---

Recursive depth-first search from 0. `path` lists the vertices whose
`dfs` call is still running; `order` lists every vertex visited so far.
Probe 1 fires once, when `u` is 4; probe 2 once, when `u` is 2.

```cpp
// undirected: 0-1 0-3 1-2 3-4
const std::vector<int> adj[5] = {{3, 1}, {0, 2}, {1}, {0, 4}, {3}};
bool seen[5] = {};
std::string path, order;
void dfs(int u) {
  seen[u] = true; path += char('0' + u); order += char('0' + u);
  if (u == 4) {}   // @1
  if (u == 2) {}   // @2
  for (int v : adj[u]) if (!seen[v]) dfs(v);
  path.pop_back();
}
int main() { dfs(0); }
```

---

DFS follows the first unseen neighbour as deep as it goes: 0, 3, 4.
At 4 nothing is new, so the calls for 4 and 3 return and leave `path`.
Only then does 0 try its next neighbour, 1, and 1 goes on to 2.

Probe 2 is the point: `order` remembers 3 and 4, but `path` is just
0 1 2. The call stack *is* the DFS stack, and it holds one path from
the start, never the whole visited set. An explicit `std::vector` used
as a stack does the same job without recursion.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
