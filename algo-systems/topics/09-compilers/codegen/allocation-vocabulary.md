---
id: compiler-allocation-vocabulary
kind: cloze
version: 1
level: 5
tags: [compilers, codegen, registers]
requires:
  - compiler-liveness-interference
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://dl.acm.org/doi/10.1145/177492.177575
---

The interference graph joins two live ranges that are
{{c1::live at the same point::a condition on time}}, and allocating K
machine registers is K-colouring it. A node of degree
{{c2::less than K::a bound}} can always be coloured whatever its
neighbours get, so the **simplify** phase removes such nodes onto a
stack. When every remaining node has degree ≥ K, one is picked as a
candidate to {{c3::spill::the fallback}}, by uses
weighted by loop depth, divided by degree.
