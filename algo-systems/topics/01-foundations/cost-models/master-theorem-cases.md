---
id: foundations-master-theorem-cases
kind: cloze
version: 1
level: 3
tags: [complexity, recurrences, divide-and-conquer]
requires:
  - algo-basics/complexity-master-theorem
refs:
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
  - https://dl.acm.org/doi/10.1145/1008861.1008865
---

Merge sort is `T(n) = 2T(n/2) + Θ(n)`: leaves and combine cost the same
order, so T(n) is {{c1::Θ(n log n)}}. Karatsuba multiplication is
`T(n) = 3T(n/2) + Θ(n)`: the {{c2::leaves::which side of the comparison}}
dominate, giving `Θ(n^(log₂ 3)) ≈ Θ(n^1.585)`.
