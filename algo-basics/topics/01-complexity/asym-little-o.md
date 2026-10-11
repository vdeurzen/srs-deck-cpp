---
id: complexity-asym-little-o
kind: basic
version: 1
level: 1
tags: [foundations, complexity, little-o]
requires:
  - complexity-asym-big-o-definition
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation#Little-o_notation
---

## Two claims: 2n = o(n²) and 2n = o(n) (little-o). Which of them hold?

---

**Only the first. Little-o means f becomes negligible next to g: f/g → 0.**
Precisely: for *every* c > 0 some n₀ makes f(n) < c·g(n) for all
n ≥ n₀. 2n < c·n² once n > 2/c, for any c; but 2n < c·n fails for every
c ≤ 2. Big-O needs one c; little-o must survive them all.
