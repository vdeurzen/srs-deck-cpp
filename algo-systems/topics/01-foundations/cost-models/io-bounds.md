---
id: foundations-io-bounds
kind: cloze
version: 1
level: 4
requires:
  - foundations-external-memory-model
tags: [complexity, cost-model, databases]
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://en.algorithmica.org/hpc/external-memory/model/
---

In the external-memory model, scanning `N` items costs
{{c1::Θ(N/B)::each transfer is shared by many items}} transfers, and a
B-tree search costs {{c2::Θ(log_B N)}}. For `N = 10⁹` keys and 256 keys
per page that is {{c3::4::256³ ≈ 1.7·10⁷, 256⁴ ≈ 4.3·10⁹}} page reads,
where a binary search tree with one key per node needs about 30.

---

The base of the logarithm is the whole design: fanout, not the balancing
scheme, decides how many blocks a search touches. And `N/B` against `N`
is why "just scan it" beats a clever random-access index far more often
than the RAM model suggests.
