---
id: dp-bitmask-signal
kind: basic
version: 1
level: 4
tags: [dynamic-programming, bitmask-dp, recognition, lc-847, lc-943]
requires:
  - technique-dp-state
  - foundations-bits-trace
refs:
  - https://leetcode.com/problems/shortest-path-visiting-all-nodes/
  - https://leetcode.com/problems/find-the-shortest-superstring/
  - https://doi.org/10.1137/0110015
elaborate: LC 1986 (minimum work sessions, n ≤ 14) has no graph at all. What is the mask there, and what goes beside it in the state?
---

> Return the length of the shortest path that visits every node. You
> may start and stop at any node, revisit nodes multiple times, and reuse
> edges. `1 <= n <= 12`.

## What does one search state need to record?

---

**(set of nodes visited as an `n`-bit mask, current node): 2ⁿ · n states.**

Earlier visit order no longer matters, only which nodes and where you
stand. `n ≤ 12` is the hint: 2¹² · 12 ≈ 49k states against 12! ≈ 479
million orders. Unweighted (LC 847): BFS over these states; weighted:
Held–Karp DP.
