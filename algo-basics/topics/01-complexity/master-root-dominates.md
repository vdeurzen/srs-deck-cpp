---
id: complexity-master-root-dominates
kind: basic
version: 1
level: 2
tags: [complexity, recurrences, divide-and-conquer]
requires:
  - complexity-master-theorem
refs:
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
---

## `T(n) = 2T(n/2) + n²`: two halves, but a quadratic combine. Why is the answer just Θ(n²)?

---

**Each level costs half the one above, so the root's n² dominates.**
Level k has 2ᵏ calls of (n/2ᵏ)² work: n²/2ᵏ in total. The sum
n² + n²/2 + n²/4 + … stays below 2n², and the n leaves cost only n. When
the combine grows faster than the leaves, the combine is the answer.
