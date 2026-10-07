---
id: graph-iterative-dfs
kind: basic
version: 1
level: 3
tags: [graphs, traversal, stack]
requires:
  - graph-bfs-and-dfs
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
elaborate: Which recursive walk in your code base (AST, CFG, dependency graph) has a depth an attacker or a generated input controls?
---

## A recursive DFS passes every test, then crashes on a generated CFG that is one straight chain of 1 000 000 blocks. Why?

---

**Recursion depth equals path length: a million frames overflow the thread's stack.**

Each frame holds a return address, saved registers and locals; a stack
of a few megabytes runs out long before a million of them. Production
DFS keeps an explicit stack of (vertex, next-edge index) pairs, which
also makes the finish time an explicit event.
