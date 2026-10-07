---
id: complexity-growth-ladder
kind: cloze
version: 1
level: 1
tags: [complexity, big-o]
requires:
  - complexity-big-o-scaling
refs:
  - https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities
---

The common classes, slowest-growing first:
1 < log n < {{c1::√n}} < n < {{c2::n log n}} < n² < 2ⁿ < {{c3::n!}}.

---

At n = 64: log₂ n = 6, √n = 8, n = 64, n log n = 384, n² = 4 096,
2ⁿ ≈ 1.8·10¹⁹, and n! ≈ 1.3·10⁸⁹. Below n the classes come from halving
or a √n cutoff; n log n is "log n levels of n work" (sorting); 2ⁿ is
"every subset" and n! "every ordering".
