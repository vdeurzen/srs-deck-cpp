---
id: sort-quick-average
kind: cloze
version: 1
level: 2
tags: [sorting, quicksort, complexity]
requires:
  - sort-quick-idea
  - complexity-shrink-by-one-vs-half
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Average-case_analysis
  - https://doi.org/10.1093/comjnl/5.1.10
---

Quicksort with a uniformly random pivot, on 1 000 distinct keys. The
pivot lands in the middle half (rank 250–749) with probability
{{c1::1/2::a fraction}}. When it does, both sides hold at most
{{c2::3/4::a fraction}} of the range. So a range shrinks to one element
after O(log n) partitions, and each level of partitions costs Θ(n):
Θ(n log n) expected, on every input.

---

The pivot's rank is uniform, so half the ranks are "good". A good split
shrinks every element's range by ≥ 1/4, so log₄⁄₃ n good splits suffice
and, expected, about twice that many partitions in all. Expected
comparisons ≈ 2n ln n ≈ 1.39 n log₂ n.
