---
id: graph-dfs-call-stack-trace
kind: trace
version: 3
level: 2
tags: [foundations, graphs, traversal, dfs, tracing]
probes:
  1: { "path[1]": "2", "seen[1]": "true" }
requires:
  - graph-dfs-worked
  - cpp-essentials/vector-back-pop-back
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Depth-first_search
elaborate: A DFS on a path of a million vertices has undefined behaviour (on Linux the process is killed) but the same walk with an explicit stack does not. Say why, as to an interviewer.
---

Recursive depth-first search from 0; the braces give each `adj[u]`, the
list of u's neighbours. `path` lists the vertices whose `dfs` call is
still running. Probe @1 is read once, just after 2 is pushed.

```cpp
// edges 0-1 and 0-2, each stored in both lists
const std::vector<int> adj[3] = {{1, 2}, {0}, {0}};
bool seen[3] = {false, false, false};
std::vector<int> path;
void dfs(int u) {
  seen[u] = true;
  path.push_back(u);   // @1
  for (int v : adj[u])
    if (!seen[v]) dfs(v);
  path.pop_back();
}
int main() { dfs(0); }
```

---

DFS follows 0's first neighbour, 1. 1's only neighbour is 0, already
seen, so the call for 1 returns and **pops 1 off `path`**. Only then does
0 try 2: `path` is `0 2`, while `seen[1]` stays true.

The call stack *is* the DFS stack: it holds one path from the start,
never the whole visited set, which `seen` records. An explicit
`std::vector` used as a stack does the same job without recursion.

(Values from running it under GCC 16.2.)
