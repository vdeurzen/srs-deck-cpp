---
id: foundations-explain-choosing-a-structure
kind: explain
version: 3
level: 4
requires:
  - foundations-explain-workload-first
  - foundations-explain-cost-per-operation
  - ordered-rbtree-vs-btree
  - hash-swiss-table-metadata
  - ordered-eytzinger-layout
tags: [complexity, cost-model, interview]
elaborate: How would you confirm the choice — which benchmark, on what data, against which baseline?
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://abseil.io/about/design/swisstables
---
An interviewer asks: a compiler pass builds a symbol table of about
10 000 names per function — all inserts first, then millions of lookups
by name, single threaded. A colleague proposes `std::map`; you have a
flat hash map and a sorted `std::vector` in mind. Which do you pick,
and why?
---
- [ ] Picks the flat hash map: the pass needs only point lookups by name, never names in order
- [ ] `std::map` makes ~14 dependent node hops per lookup (log₂ 10⁴), each a likely cache miss
- [ ] The flat hash map filters a whole group by its control bytes, so a lookup usually compares one key
- [ ] A sorted vector is contiguous, but binary search still probes ~14 distant cache lines per lookup
- [ ] Single threaded, so no shared-line or lock costs separate them: misses per lookup decide
