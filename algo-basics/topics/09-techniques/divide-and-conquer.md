---
id: technique-divide-and-conquer
kind: cloze
version: 1
level: 1
tags: [divide-and-conquer, recursion]
requires:
  - technique-recursion-base-case
refs:
  - https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm
  - https://dl.acm.org/doi/10.1145/1008861.1008865
---

Divide and conquer splits a problem into
{{c1::independent::how the parts relate to each other}} subproblems of
the same kind, solves each recursively, then {{c2::combines::the step after
the recursive calls}} their answers. Merge sort splits an array in O(1),
sorts both halves, and spends O(n) merging them.

---

The cost is the recurrence `T(n) = a·T(n/b) + (split + combine)`, which
the master theorem solves. Independence is what makes the halves
separable: neither half needs the other's answer, so nothing is computed
twice.
