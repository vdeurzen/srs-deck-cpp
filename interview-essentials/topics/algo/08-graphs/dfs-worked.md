---
id: graph-dfs-worked
kind: basic
version: 1
level: 1
tags: [graphs, traversal, dfs, worked-example]
requires:
  - graph-bfs-and-dfs
  - technique-call-stack-worked
  - cpp-essentials/expr-increment-value
  - cpp-essentials/iter-range-for-const-auto-ref
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Depth-first_search
---

## Recursive DFS from 0 on the directed graph 0→1, 0→2, 1→2 stamps `d[u]` on entry and `f[u]` on finish from one counter `t`. Why does 0 skip 2 in the last row?

```cpp
void dfs(int u) {
  seen[u] = true; d[u] = ++t;
  for (int v : adj[u]) if (!seen[v]) dfs(v);
  f[u] = ++t;
}
```

```
event                  calls running   stamp
enter 0                0               d[0] = 1
enter 1 (0's 1st edge) 0 1             d[1] = 2
enter 2 (1's edge)     0 1 2           d[2] = 3
2, then 1 finish       0               f[2] = 4, f[1] = 5
0 skips 2 (seen)       —               f[0] = 6
```

---

**1 already reached 2: DFS follows 0's first edge as deep as it goes.**

0's loop resumes only after the call for 1, and everything 1 reached,
has returned. By then `seen[2]` is true, so 0's second edge adds
nothing and 0 finishes last.
