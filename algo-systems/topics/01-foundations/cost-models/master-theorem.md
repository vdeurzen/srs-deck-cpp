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
into {{c1::a}} subproblems of size `n/b` and spends `f(n)` on the split and
the combine. The master theorem compares `f(n)` against the work at the
leaves, {{c2::n^(log_b a)::the number of leaves times O(1) each}}: whichever
side dominates polynomially is the answer, and when the two are the same
order the cost is spread evenly over all {{c3::log_b n::the height of the
recursion tree}} levels, giving an extra logarithmic factor.

Merge sort is `a = 2`, `b = 2`, `f(n) = Θ(n)`, so leaves and combine cost
match and T(n) is {{c4::Θ(n log n)}}. Binary search is `a = 1`, `b = 2`,
`f(n) = Θ(1)` and lands at `Θ(log n)`. Karatsuba multiplication is
`a = 3`, `b = 2`, `f(n) = Θ(n)`, where the leaves dominate:
`Θ(n^(log_2 3)) ≈ Θ(n^1.585)`.

The theorem says nothing about recurrences with uneven splits
(`T(n) = T(n/5) + T(7n/10) + n`, the median-of-medians recurrence) — for
those, {{c5::the recursion tree::or the substitution method, guess and
prove by induction}} is the tool.
