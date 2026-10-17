---
id: complexity-drop-terms
kind: basic
version: 1
level: 1
tags: [complexity, big-o]
requires:
  - complexity-big-o-scaling
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

## A routine does `3n² + 100n + 7` steps. Why is that written as just O(n²)?

---

**For large n the n² term dominates, and constant factors only scale.**
At n = 10⁶ the n² term is 3·10¹² and `100n` is 10⁸: about 0.003 % of
the total. The 3 cancels whenever you compare n against 10n (both sides
grow ×100), so it says nothing about growth.
