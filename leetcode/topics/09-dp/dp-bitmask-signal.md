---
id: dp-bitmask-signal
kind: basic
version: 1
level: 4
tags: [dynamic-programming, recognition, lc-847, lc-943]
requires:
  - interview-essentials/technique-dp-state
  - interview-essentials/foundations-bits-trace
refs:
  - https://leetcode.com/problems/shortest-path-visiting-all-nodes/
  - https://leetcode.com/problems/find-the-shortest-superstring/
  - https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/
  - https://doi.org/10.1137/0110015
elaborate: Minimum Number of Work Sessions to Finish the Tasks (LC 1986) asks for the fewest sessions of at most `sessionTime` hours that finish `n ≤ 14` tasks of given lengths, and has no graph at all. What is the mask there, and what goes beside it in the state?
---

> Given an undirected connected graph of `n` nodes as adjacency lists,
> return the length of the shortest path that visits every node. You
> may start and stop at any node, revisit nodes multiple times, and reuse
> edges. `1 <= n <= 12`.

## What does one search state need to record?

---

**(set of nodes visited as an `n`-bit mask, current node): 2ⁿ · n states.**

Earlier visit order no longer matters, only which nodes and where you
stand. `n ≤ 12` is the hint: 2¹² · 12 ≈ 49k states against 12! ≈ 479
million orders. Unweighted, as here: BFS over these states; weighted:
Held–Karp DP.
