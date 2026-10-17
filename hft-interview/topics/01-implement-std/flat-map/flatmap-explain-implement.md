---
id: flatmap-explain-implement
kind: explain
version: 1
level: 5
tags: [hashing, open-addressing, low-latency, implement-std]
elaborate: "The other common design is a Swiss table (`absl::flat_hash_map`): a control byte per slot, 16 slots filtered per SIMD compare. When would you pick it over Robin Hood?"
requires:
  - algo-systems/hash-backward-shift
  - algo-systems/hash-robin-hood-early-exit
  - interview-essentials/hash-unordered-map-is-chained
refs:
  - https://abseil.io/about/design/swisstables
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
  - https://eel.is/c++draft/unord.req.general
---
The interviewer: "Our hot path does millions of lookups a second in a
`std::unordered_map<std::uint64_t, Order>`. Implement a flat hash map to
replace it" (an open-addressed hash table, not C++23's sorted
`std::flat_map`). Use Robin Hood hashing, and walk
through the layout, insert, lookup and erase, and what callers give up.
---
- [ ] Keeps elements directly in one array of slots, because a chained table pays an extra dependent load to reach each separately allocated node
- [ ] Insert swaps the carried key with any occupant closer to its home slot, because that keeps the keys along a run ordered by home slot
- [ ] A lookup stops once its distance from home exceeds the occupant's, because the key would have displaced that richer occupant on insert
- [ ] Erase shifts each following key back one slot until an empty slot or a key at its home, because a hole would cut probe runs and tombstones would pile up
- [ ] Callers lose stable references: a rehash invalidates pointers into the map, because it moves elements between slots (`std::unordered_map` never moves them)

