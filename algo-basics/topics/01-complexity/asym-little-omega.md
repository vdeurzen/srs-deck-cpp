---
id: complexity-asym-little-omega
kind: basic
version: 1
level: 1
tags: [foundations, complexity, little-omega]
requires:
  - complexity-asym-little-o
  - complexity-asym-big-omega-witness
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation#Related_asymptotic_notations
---

## n² is Ω(n²) and also Ω(n). For which of the two does the stronger ω (little-omega) hold as well?

---

**Only n² = ω(n): ω means f dwarfs g, f/g → ∞; equivalently g = o(f).**
Precisely: for every c > 0 some n₀ makes f(n) > c·g(n) for all n ≥ n₀.
n²/n = n grows without bound; n²/n² = 1 stays put. Ω allows equal
growth, ω excludes it: the same gap as O versus o.
