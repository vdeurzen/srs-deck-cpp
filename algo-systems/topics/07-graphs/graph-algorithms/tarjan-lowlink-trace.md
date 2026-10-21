---
id: graph-tarjan-lowlink-trace
kind: trace
version: 2
level: 5
tags: [tracing, graphs, dfs]
probes:
  1: { "low[2]": "2", "on[2]": "false" }
requires:
  - graph-tarjan-worked
  - graph-tarjan-on-stack
  - interview-essentials/stl-min-max
  - cpp-essentials/vector-back-pop-back
refs:
  - https://doi.org/10.1137/0201010
elaborate: Say in one sentence what component Tarjan would report if the `on[v]` test were dropped here.
---

Tarjan's algorithm on `0 → 1`, `0 → 2`, `2 → 1`. `dfs(0)` has visited
1, which had no out-edges and was emitted as the component `{1}`. Now
`dfs(0)` calls `dfs(2)`; the state at that moment is shown.

```cpp
std::vector<int> adj[3] = {{1, 2}, {}, {1}};
int idx[3] = {0, 1, -1}, low[3] = {0, 1, -1}, counter = 2;
bool on[3] = {true, false, false};   // on the stack?
std::vector<int> st{0};
void dfs(int u) {
  idx[u] = counter; low[u] = counter; ++counter;
  st.push_back(u); on[u] = true;
  for (int v : adj[u])
    if (idx[v] < 0) { dfs(v); low[u] = std::min(low[u], low[v]); }
    else if (on[v]) low[u] = std::min(low[u], idx[v]);
  if (low[u] != idx[u]) return;       // not a root: stay on the stack
  while (st.back() != u) { on[st.back()] = false; st.pop_back(); }
  on[u] = false; st.pop_back();       // a root: its component is popped
}
int main() { dfs(2); }   // @1
```

---

2 gets index 2. Its edge reaches 1, already visited but **off the
stack**: 1's component is finished and cannot reach back to 2, so
`low[2]` stays 2. Lowlink equals index, so 2 roots its own component
and pops itself off the stack. Lowering through 1 would give
`low[2] = 1`, keep 2 on the stack, and later merge it into 0's
component.

Verified by compiling and running this program (with `<algorithm>` and
`<vector>`) under GCC 16.2.
