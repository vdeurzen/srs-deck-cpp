---
id: containers-explain-choosing
kind: explain
version: 1
level: 3
tags: [containers]
requires:
  - containers-stable-references
  - iter-explain-vector-growth
  - containers-map-vs-unordered-map
refs:
  - https://en.cppreference.com/w/cpp/container
---
A colleague asks which standard container to use for a new piece of code.
Walk through how you decide.
---
- [ ] Defaults to `std::vector`, leaving it only for a guarantee it lacks: contiguous storage makes scans and indexing the cheapest
- [ ] Names the cost of growth: reallocation invalidates every reference, pointer and iterator into a `vector`
- [ ] Names `deque` when references must survive appending at either end and O(1) indexing is still needed
- [ ] Names `list` only when references must survive insertion anywhere and indexing is not needed
- [ ] Picks `std::map` when keys must be ordered (range queries, sorted iteration), otherwise `std::unordered_map` for average O(1) exact-key lookup
