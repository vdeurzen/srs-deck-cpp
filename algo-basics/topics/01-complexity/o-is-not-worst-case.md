---
id: complexity-o-is-not-worst-case
kind: basic
version: 1
level: 2
tags: [complexity, big-o, best-worst-average, misconception]
requires:
  - complexity-o-omega-theta
  - complexity-best-worst-linear-search
elaborate: Pick a function you know well. State its best case and worst case each as a Θ bound.
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Best,_worst_and_average_case
---

## "Big-O is the worst case, Ω the best case", so linear search, best case, is Ω(1). What is wrong with that reading?

---

**It mixes two independent axes.** O, Ω and Θ bound *a function*; best,
worst and average pick *which function*. The best case (key first) is
Θ(1), so also O(1); the worst case (key absent) is Θ(n), so also Ω(n). The belief sticks because "O(…)" is usually quoted for the
worst case.
