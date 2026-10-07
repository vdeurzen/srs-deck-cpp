---
id: foundations-uneven-split-recurrence
kind: cloze
version: 1
level: 3
tags: [complexity, recurrences, divide-and-conquer]
requires:
  - algo-basics/complexity-master-theorem
refs:
  - https://doi.org/10.1016/S0022-0000(73)80033-9
  - https://en.wikipedia.org/wiki/Median_of_medians
---

Median-of-medians selection recurses on two subproblems of different
sizes: `T(n) = T(n/5) + T(7n/10) + n`. The master theorem needs equal
splits, so it does not apply. A {{c1::recursion tree::draw the calls
level by level}} shows each level does 9/10 of the work of the one
above, so the total is {{c2::Θ(n)::a geometric series}}.

---

The subproblem sizes sum to 9n/10 < n, so the per-level work shrinks
geometrically and the root's `n` dominates. Had they summed to n, every
level would cost n and the result would carry a log factor.
