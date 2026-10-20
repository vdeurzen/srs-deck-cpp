---
id: complexity-cost-trace-binary-counter
kind: basic
version: 2
level: 2
tags: [foundations, complexity, counters]
requires:
  - complexity-cost-amortized
  - interview-essentials/complexity-geometric-sum-intro
elaborate: Where else is an operation occasionally expensive yet cheap over any sequence of calls, and what pays for the expensive ones?
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
---

A 4-bit counter is incremented by turning its trailing 1s into 0s and
the next 0 into a 1, so `0111 → 1000` writes 4 bits.

## Counting from `0000` up to `1000` (8 increments), how many bits are written in total?

---

**15 = 8 + 4 + 2 + 1: bit k changes every 2ᵏ-th increment.**

Per increment: 1, 2, 1, 3, 1, 2, 1, 4. One increment can write log n
bits, but n increments write fewer than n + n/2 + n/4 + … < 2n: about 2
per increment, amortised.
