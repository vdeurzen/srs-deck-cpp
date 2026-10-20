---
id: complexity-asym-theta-sandwich
kind: basic
version: 1
level: 1
tags: [foundations, complexity, big-theta]
requires:
  - complexity-asym-big-omega
elaborate: "Name a routine of yours whose cost you could state as Θ, and one where only an O bound is honest. What makes the difference?"
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

## f(n) = n² − 10n has been shown O(n²) with c = 1 and, separately, Ω(n²) with c = 1/2 from n₀ = 20. What do the two results establish together?

---

**f(n) = Θ(n²): it is sandwiched, ½·n² ≤ f(n) ≤ 1·n² for every n ≥ 20.**
Θ(g) means exactly "O(g) and Ω(g)": two lines of the same shape, one
tilted below f and one above, f trapped between them from the later
threshold on. Θ is the tight statement; O alone leaves room above, Ω
alone room below.
