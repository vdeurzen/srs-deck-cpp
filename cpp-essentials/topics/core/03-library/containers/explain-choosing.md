---
id: containers-explain-choosing
kind: explain
version: 2
level: 3
tags: [containers]
requires:
  - containers-stable-references
  - containers-reference-invalidated-by-growth
  - containers-map-vs-unordered-map
elaborate: Say which container a recent piece of your code used, and whether this walk-through would have picked it.
refs:
  - https://en.cppreference.com/w/cpp/container
---
A colleague asks which standard container to use for a new piece of code.
Walk through how you decide.
---
- [ ] Cue: lists the operations and guarantees the code needs (scan, index, append, stable references, key order)
- [ ] Picks `std::vector` by default: contiguous storage makes scans and indexing the cheapest
- [ ] Example: pointers kept into the sequence while appending rule out `vector`; pick `std::deque`
- [ ] Cost: `vector` growth reallocates and invalidates every reference, pointer and iterator into it
- [ ] Look-alike: `std::map` for ordered keys and range queries, else `std::unordered_map` for exact-key lookup
