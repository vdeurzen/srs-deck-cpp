---
id: graph-union-find-bound
kind: basic
version: 1
level: 4
tags: [union-find, amortised]
requires:
  - graph-union-find
refs:
  - https://doi.org/10.1145/62.2160
---

## Union-find with union by size alone is O(log n) per operation; path compression alone is about O(log n) too. What do both together give?

---

**O(α(n)) amortised: inverse Ackermann, below 5 for any real n.**

Union by size keeps trees shallow; compression (or halving) flattens
the paths that are walked anyway. Neither alone reaches the bound
(Tarjan and van Leeuwen, 1984). Plain `parent[x]` with no compression
quietly gives it back.
