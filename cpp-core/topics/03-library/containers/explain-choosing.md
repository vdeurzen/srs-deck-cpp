---
id: containers-explain-choosing
kind: explain
version: 1
level: 3
tags: [containers]
requires:
  - containers-stable-references
  - containers-const-map-lookup
refs:
  - https://en.cppreference.com/w/cpp/container
---
A colleague asks which standard container to use for a new piece of code.
Walk through how you decide.
---
- [ ] Defaults to `std::vector`: contiguous storage makes scans and indexing the cheapest
- [ ] Names the cost of growth: reallocation invalidates every reference, pointer and iterator into a `vector`
- [ ] Reaches for `deque`, `list` or a node-based map only for a guarantee `vector` lacks, such as references that survive insertion
- [ ] Picks `std::map` when keys must be ordered (range queries, sorted iteration), otherwise `std::unordered_map` for average O(1) exact-key lookup
- [ ] Looks keys up with `contains`/`find`/`at`, never `operator[]`, which inserts a missing key
