---
id: complexity-o-omega-theta
kind: cloze
version: 1
level: 2
tags: [complexity, big-o]
requires:
  - complexity-big-o-definition
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

Worst-case insertion sort makes f(n) ≈ n²/2 comparisons. Saying f is
O(n³) is true but loose: O only promises f grows
{{c1::no faster than::compared with g}} g. Saying f is Ω(n) is also true:
Ω promises f grows {{c2::at least as fast as::compared with g}} g. The
tight statement is Θ(n²), which means f is {{c3::both O(n²) and Ω(n²)}}.

---

Knuth's 1976 note fixed these three meanings: O is an upper bound, Ω a
lower bound, Θ both at once (up to constant factors). Everyday speech says
"O(n²)" when it means Θ(n²); when the distinction matters, as in "every
comparison sort is Ω(n log n)", the letter is chosen deliberately.
