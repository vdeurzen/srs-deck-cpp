---
id: graph-tarjan-scc
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dfs]
requires:
  - algo-basics/graph-bfs-and-dfs
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
---

## Tarjan's SCC algorithm keeps a DFS `index` and a `lowlink` per vertex, and a stack of visited vertices. How does it know a vertex roots a component?

---

**It finishes with `lowlink == index`; pop the stack down to it — that is the SCC.**

`lowlink` is the smallest index its subtree reaches by tree edges plus
one edge to a vertex still on the stack. Equal means nothing below
reaches higher. One DFS, O(V + E), no transposed graph, unlike
Kosaraju's two passes.
