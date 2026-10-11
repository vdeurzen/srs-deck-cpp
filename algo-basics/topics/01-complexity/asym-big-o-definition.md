---
id: complexity-asym-big-o-definition
kind: basic
version: 1
level: 1
tags: [foundations, complexity, big-o]
requires:
  - complexity-asym-step-model
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation#Formal_definition
---

## T(n) is O(g(n)) when some c > 0 and n₀ give T(n) ≤ c·g(n) for all n ≥ n₀. For T(n) = 4n + 3 and g(n) = n a colleague offers c = 4, n₀ = 0, "since the slope is 4". Does that witness work?

---

**No: 4n + 3 ≤ 4·n never holds; any c > 4 does, e.g. c = 5 from
n₀ = 3.** Picture c·g(n) as a line you may tilt as steep as you like,
and n₀ as leave to ignore the start: T must stay under the line from n₀
on. A slightly steeper line swallows the + 3.
