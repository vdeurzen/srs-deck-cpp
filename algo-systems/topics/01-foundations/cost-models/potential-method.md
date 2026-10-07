---
id: foundations-potential-method
kind: cloze
version: 1
level: 3
tags: [complexity, amortised, sequences]
requires:
  - foundations-growth-factor
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.wikipedia.org/wiki/Potential_method
---

The potential method proves a doubling vector's `push_back` amortised
O(1) with Φ = {{c1::2·size − capacity::a function of the vector's state}}:
each cheap push raises Φ by 2, and a doubling push lets Φ fall by about
the n elements it copies, so every push costs 3 amortised.

---

Amortised cost = actual + ΔΦ. A push with room: 1 + 2 = 3. A push into a
full vector of n: (n + 1) + (2 − n) = 3. The proof is valid because Φ
starts at 0 and never goes negative: after a doubling, size ≥ capacity/2.
