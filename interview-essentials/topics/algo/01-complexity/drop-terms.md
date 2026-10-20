---
id: complexity-drop-terms
kind: basic
version: 2
level: 1
tags: [complexity, big-o]
requires:
  - complexity-big-o-scaling
elaborate: "When would the dropped 100n term matter in practice, and how would you say so to an interviewer?"
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

## A routine does `3n² + 100n + 7` steps and is stated as O(n²). Why may the `100n + 7` be dropped?

---

**For large n the n² term dominates; the rest becomes a vanishing fraction.**

At n = 10⁶ the n² term is 3·10¹² and `100n` is 10⁸: about 0.003 % of
the total, and the share keeps shrinking as n grows. Only the
fastest-growing term decides how the cost scales.
