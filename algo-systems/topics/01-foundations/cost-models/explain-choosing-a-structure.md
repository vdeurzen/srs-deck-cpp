---
id: foundations-explain-choosing-a-structure
kind: explain
version: 2
level: 4
requires:
  - foundations-explain-workload-first
  - foundations-explain-cost-per-operation
tags: [complexity, cost-model, interview]
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/48529.48535
---
A compiler pass builds a symbol table of about 10 000 names per
function: all inserts first, then millions of lookups by name, single
threaded. A colleague proposes `std::map`; you have a flat hash map and
a sorted `std::vector` in mind. Decide, and say how you would confirm it.
---
- [ ] Splits the workload into a build phase and a query phase, so the structure can be built one way and queried another (append, then sort once)
- [ ] Counts misses per lookup: `std::map` makes ~14 dependent node hops (log₂ 10⁴), the flat hash map ~1–2, binary search over a contiguous vector ~14 probes with its top levels cached
- [ ] Prices the string keys: a hash map hashes the name once and compares one or two candidates, while `std::map` and binary search do ~14 string comparisons, each of which may walk a shared prefix
- [ ] Notes that stability does not matter here: nothing holds a reference across the build, so a flat table's rehash or a vector's reallocation is harmless (and `reserve` removes it)
- [ ] Gives a verdict — the flat hash map for point lookups, the sorted vector only if the pass also needs names in order — and confirms it by benchmarking on real function sizes against the sorted-vector baseline
