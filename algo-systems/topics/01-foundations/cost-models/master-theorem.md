---
id: foundations-master-theorem
kind: cloze
version: 1
level: 2
tags: [complexity, recurrences, divide-and-conquer]
refs:
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
  - https://dl.acm.org/doi/10.1145/1008861.1008865
---

A divide-and-conquer recurrence `T(n) = a·T(n/b) + f(n)` splits a problem
into `a` subproblems of size `n/b` and spends `f(n)` on the split and
the combine. The master theorem compares `f(n)` against the work at the
leaves, {{c2::n^(log_b a)::a power of n}}: whichever
side dominates polynomially is the answer, and when the two are the same
order the cost is spread evenly over all {{c3::log_b n::a count of levels}} levels, giving an extra logarithmic factor.
