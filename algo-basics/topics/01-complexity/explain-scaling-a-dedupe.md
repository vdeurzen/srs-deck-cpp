---
id: complexity-explain-scaling-a-dedupe
kind: explain
version: 1
level: 3
tags: [complexity, capstone]
requires:
  - complexity-feasible-n
  - complexity-amortised-single-call
  - complexity-master-compare
refs:
  - https://en.wikipedia.org/wiki/Big_O_notation
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://epubs.siam.org/doi/10.1137/0606031
---

A teammate's job removes duplicate records: for each record it compares
against every later one, and pushes survivors onto a `std::vector`. It
takes 0.1 s for 10 000 records; next month it gets 1 000 000. Talk them
through what will happen and what to change.
---
- [ ] Predicts ~17 minutes: comparing all pairs is Θ(n²), so 100× the records is 10 000× the time
- [ ] Rules out any quadratic fix: at ~10⁸ steps/s, a million records needs n log n or better
- [ ] Proposes sort, then one pass comparing neighbours: Θ(n log n), merge sort's recurrence being a master-theorem tie
- [ ] Warns that one `push_back` may copy the whole vector, since amortised O(1) bounds only the total; `reserve(n)` removes it
- [ ] Notes a hash set is O(1) only on average, so crafted keys can degrade it, while sorting's n log n holds for every input
