---
id: complexity-asym-big-omega
kind: basic
version: 1
level: 1
tags: [foundations, complexity, big-omega]
requires:
  - complexity-asym-big-o-definition
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

## f(n) is Ω(g(n)) when some c > 0 and n₀ give f(n) ≥ c·g(n) for all n ≥ n₀. For f(n) = n²/2 − 3n and g(n) = n² a colleague offers c = ½, n₀ = 1, "the leading coefficient". Does that witness work?

---

**No: n²/2 − 3n ≥ n²/2 never holds. Any c < ½ does, e.g. c = ¼ from
n₀ = 12.** Ω is O's mirror: the line c·g is tilted *below* f, and f must
stay above it from n₀ on, so f grows at least as fast as g. The −3n is
absorbed by tilting a little shallower.
