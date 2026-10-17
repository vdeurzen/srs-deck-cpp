---
id: complexity-master-theorem
kind: cloze
version: 2
level: 2
tags: [complexity, recurrences, divide-and-conquer]
requires:
  - complexity-recurrence-unroll
  - interview-essentials/complexity-cost-master-cases
refs:
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
---

A divide-and-conquer recurrence `T(n) = a·T(n/b) + f(n)` splits a problem
into `a` subproblems of size `n/b` and spends `f(n)` on the split and the
combine. The master theorem compares `f(n)` with the work at the leaves,
{{c1::n^(log_b a)::a power of n}}. Whichever side grows polynomially
faster sets the answer. When the two are the same order, every level of
the recursion tree costs about f(n), so
T(n) = {{c2::Θ(f(n) · log n)::in terms of f}}.

---

Why the leaves cost n^(log_b a): the tree branches `a` ways for log_b n
levels, so it has a^(log_b n) = n^(log_b a) leaves. In a tie, those
log_b n levels each cost Θ(f(n)), and the base of the log is a constant
factor. Merge sort (a = b = 2,
f = n) has n leaves against an n combine: same order, so Θ(n log n).
Bentley, Haken and Saxe gave the general method in 1980.
