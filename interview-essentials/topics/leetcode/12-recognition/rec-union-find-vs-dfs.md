---
id: rec-union-find-vs-dfs
kind: basic
version: 2
level: 3
tags: [graphs, recognition, lc-547, lc-684]
requires:
  - graph-union-find-forest
  - graph-union-find-problem
  - graph-bfs-and-dfs
refs:
  - https://leetcode.com/problems/number-of-provinces/
  - https://leetcode.com/problems/redundant-connection/
  - https://doi.org/10.1145/364099.364331
elaborate: Union-find can merge sets but not split them. If edges were also deleted between questions, but every deletion was known up front, how could you still use it?
---

> (a) `isConnected` is an n × n matrix of which cities are directly
> linked, `n <= 200`. Return the number of provinces (groups of linked
> cities).
>
> (b) Up to 1000 edges are added to a graph one at a time. Before adding
> each, report whether its two ends are already connected.

## Union-find fits one of them better than a plain DFS. Which one?

---

**(b): it asks a connectivity question after every added edge.**

Each question is `find(u) == find(v)`, then a union. A DFS would rewalk the graph for every question. (a) asks once
about a fixed graph: one DFS per unvisited city counts the provinces.
