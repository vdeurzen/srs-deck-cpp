---
id: hash-load-factor-and-probes
kind: cloze
version: 2
level: 4
requires:
  - interview-essentials/hash-chaining-vs-open-addressing
tags: [hashing, complexity, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Linear_probing
  - Knuth, The Art of Computer Programming, Vol. 3, 2nd ed., §6.4 (Algorithm L and its analysis)
  - https://abseil.io/about/design/swisstables
---

In a linear-probing table at load factor α = 0.9, a successful lookup
costs about 5.5 probes on average. An unsuccessful one — which every
{{c1::insert::an operation that must find a free slot}} also pays — costs
about {{c2::50::clustering squares the blow-up}} probes. At α = 0.5 the same
miss costs {{c3::2.5}} probes.

---

Knuth (1963), for linear probing with a random hash function: hits cost
½(1 + 1/(1 − α)), misses ½(1 + 1/(1 − α)²). The square is primary
clustering. Under *uniform hashing* (each key's probe sequence a random
permutation) a miss costs only ≈ 1/(1 − α) = 10 at α = 0.9, a hit
(1/α) ln(1/(1 − α)) ≈ 2.6.
