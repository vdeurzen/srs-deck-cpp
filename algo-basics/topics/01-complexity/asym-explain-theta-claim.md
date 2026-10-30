---
id: complexity-asym-explain-theta-claim
kind: explain
version: 2
level: 2
tags: [foundations, complexity, capstone]
requires:
  - interview-essentials/complexity-asym-step-model
  - interview-essentials/complexity-asym-theta-sandwich
  - complexity-asym-big-omega-witness
  - complexity-asym-o-is-not-worst-case
elaborate: How would you check a Θ claim about a routine of your own, for instance through the limit of T(n) / g(n)?
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation
---

A junior reads "merge sort is Θ(n log n)" and asks what that actually
promises. Explain it to them.
---
- [ ] The step count T(n) stays between c₁·n log n and c₂·n log n for every n past some n₀
- [ ] T(n) counts basic steps, not seconds: a faster machine changes the constants, never the class
- [ ] Below n₀ it promises nothing: small inputs may break either bound
- [ ] O(n²) would also be true but loose, since O is only the upper bound; Θ adds the matching lower one
- [ ] It covers one chosen case, worst, best or average; each case is its own function with its own Θ
