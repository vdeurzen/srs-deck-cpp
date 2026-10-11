---
id: complexity-cost-harmonic-number
kind: basic
version: 1
level: 2
tags: [foundations, complexity, sums]
requires:
  - complexity-cost-trace-doubling
refs:
  - https://en.wikipedia.org/wiki/Harmonic_number
---

## H(n) = 1 + 1/2 + 1/3 + … + 1/n. The terms shrink towards zero; does the sum settle at some constant as n grows?

---

**No: it grows like ln n, without bound but very slowly.** Group by
doublings: 1/3 + 1/4 > 1/2, 1/5 + … + 1/8 > 1/2, so each doubling of n
adds at least 1/2: a log-sized sum. H(16) ≈ 3.4, H(10⁶) ≈ 14.4
(ln n + 0.58). Hence n/1 + n/2 + … + n/n ≈ n ln n.
