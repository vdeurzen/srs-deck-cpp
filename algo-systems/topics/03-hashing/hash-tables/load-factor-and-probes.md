---
id: hash-load-factor-and-probes
kind: cloze
version: 2
level: 4
requires:
  - hash-chaining-vs-open-addressing
tags: [hashing, complexity, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Linear_probing
  - https://abseil.io/about/design/swisstables
---

In a linear-probing table at load factor α = 0.9, a successful lookup
costs about 5.5 probes on average. An unsuccessful one — which every
{{c1::insert::an operation that must find a free slot}} also pays — costs
about {{c2::50::compute ½(1 + 1/(1 − α)²)}} probes. At α = 0.5 the same
miss costs {{c3::2.5}} probes.

---

Knuth (1963), under uniform hashing: hits cost ½(1 + 1/(1 − α)), misses
½(1 + 1/(1 − α)²). The square is why the miss cost leaves the hit cost
behind long before the table is full.
