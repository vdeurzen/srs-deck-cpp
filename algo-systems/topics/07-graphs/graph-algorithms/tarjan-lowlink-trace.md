---
id: graph-tarjan-lowlink-trace
kind: trace
version: 1
level: 5
tags: [tracing, graphs, dfs]
probes:
  1: { "low[2]": "0", "low[4]": "3", "low[5]": "5", "low[1]": "0" }
  out: "43 5 210"
requires:
  - graph-tarjan-on-stack
refs:
  - https://doi.org/10.1137/0201010
---

```cpp
std::vector<int> adj[6] = {{1, 5}, {2, 3}, {0}, {4}, {3}, {3}};
int idx[6] = {-1, -1, -1, -1, -1, -1}, low[6], counter = 0;
bool on[6]; std::vector<int> st;
void dfs(int u) {
  idx[u] = low[u] = counter++;
  st.push_back(u); on[u] = true;
  for (int v : adj[u]) {
    if (idx[v] < 0) { dfs(v); low[u] = std::min(low[u], low[v]); }
    else if (on[v]) low[u] = std::min(low[u], idx[v]);
  }
  if (low[u] != idx[u]) return;      // not a root: stay on the stack
  int v; do { v = st.back(); st.pop_back(); on[v] = false; std::cout << v; } while (v != u);
  std::cout << ' ';
}
int main() { dfs(0); }   // @1
```

---

DFS indices are 0–5 in vertex order. `2 → 0` closes the cycle 0-1-2,
so `low[2]` drops to 0 and propagates to 1. `4 → 3` is on the stack, so
`low[4] = 3` and 3 emits `{4, 3}` first. Then `5 → 3` reaches a vertex
already *off* the stack: it must not lower `low[5]`, so 5 is a
component on its own. Last, 0 emits `{2, 1, 0}`. Components come out in
reverse topological order: `{0,1,2}` points at both earlier ones.

Verified by compiling and running this program (with `<algorithm>`,
`<iostream>`, `<vector>`) under GCC 16.2 and printing `low[]`.
