---
id: complexity-asym-limit-test
kind: cloze
version: 1
level: 1
tags: [foundations, complexity, limit-test]
requires:
  - interview-essentials/complexity-asym-theta-sandwich
  - complexity-asym-little-omega
refs:
  - https://en.wikipedia.org/wiki/Big_O_notation#Related_asymptotic_notations
---

Classify by the limit of f/g as n → ∞. n/n² → 0, so n = {{c1::o(n²)}}.
(3n² + n)/n² → 3, so 3n² + n = {{c2::Θ(n²)}}. n²/n → ∞, so
n² = {{c3::ω(n)}}.

---

When the ratio settles, one number decides the letter: 0 means f is
negligible (little-o), a finite nonzero L means the two are the same
shape up to the factor L (Θ, with lines ½L·g and 2L·g), ∞ means f dwarfs
g (ω). For polynomials of equal degree the limit is the ratio of leading
coefficients. The test is one-way: a ratio that oscillates between 1 and
3 has no limit, yet f is still Θ(g).
