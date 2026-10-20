---
id: complexity-cost-master-cases
kind: cloze
version: 1
level: 2
tags: [foundations, complexity, recurrences, divide-and-conquer]
refs:
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
requires:
  - interview-essentials/complexity-recursion-tree-calls
  - complexity-cost-master-leaves
  - interview-essentials/complexity-asym-theta-sandwich
---

Decide each `T(n) = a·T(n/b) + (root work)` by comparing the root's work
with the leaves': there are a^(levels) leaves, log_b n levels, constant
work each. `T(n) = 8T(n/2) + n²`:
{{c1::Θ(n³)}}. `T(n) = 2T(n/2) + n`:
{{c2::Θ(n log n)}}. `T(n) = 2T(n/2) + n²`: {{c3::Θ(n²)}}.

---

Leaves: 8^(log₂ n) = n³ beats the root's n², and the levels grow
geometrically, so the leaves' n³ is the answer. With 2T(n/2) + n, n leaves tie
the root's n, every level does n, so levels × n = n log n. Root n²
against n leaves: levels shrink by half each, the sum is under 2n², the
root wins. Those are the three cases of the master theorem (Bentley,
Haken and Saxe, 1980); you need not quote it, only compare the two ends
of the tree.
