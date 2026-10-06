---
id: foundations-dp-optimal-substructure
kind: basic
version: 1
level: 3
tags: [dynamic-programming, graphs]
requires:
  - foundations-dp-overlapping-subproblems
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Optimal_substructure
---

## DP finds shortest paths by extending shortest sub-paths. Why does the same idea fail for the longest *simple* path?

---

```
q — r
|   |        a 4-cycle, undirected
s — t
```

**Longest simple path lacks optimal substructure: optimal pieces can
share vertices.** Longest q→r is q,s,t,r and longest r→t is r,q,s,t;
glued, they revisit q, s and t. The real longest q→t is just q,r,t.

Every piece of a shortest path is shortest (else splice in the shorter
one): Bellman's principle of optimality.
