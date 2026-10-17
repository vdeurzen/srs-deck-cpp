---
id: rec-union-find-vs-dfs
kind: basic
version: 1
level: 3
tags: [graphs, union-find, connectivity, recognition, lc-547, lc-684]
requires:
  - graph-union-find-forest
  - graph-components-code
refs:
  - https://leetcode.com/problems/number-of-provinces/
  - https://leetcode.com/problems/redundant-connection/
  - https://doi.org/10.1145/364099.364331
elaborate: Union-find can merge sets but not split them. If edges were also deleted between questions, what would you have to do?
---

> (a) `isConnected` is an n × n matrix of which cities are directly
> linked. Return the number of provinces (groups of linked cities).
>
> (b) A tree had one extra edge added. Given the edges in order, return
> the one to remove; if several work, the one that occurs last.

## Union-find clearly beats a plain DFS in one of them. Which property of its statement decides that?

---

**(b)'s edges arrive one at a time, with a connectivity question before each.**

Before adding `u–v`, check `find(u) == find(v)`: the first edge whose
ends are already joined closes the cycle. A DFS would rewalk the graph
per edge. (a) asks once about a fixed graph: one DFS per unvisited city
counts the provinces.
