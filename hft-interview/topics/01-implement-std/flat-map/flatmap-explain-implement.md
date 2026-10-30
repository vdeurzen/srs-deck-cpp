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
`std::unordered_map<std::uint64_t, Order>`. Replace it with a flat hash
map using Robin Hood hashing." (An open-addressed hash table, not C++23's
sorted `std::flat_map`.) How do you build it?
---
- [ ] Keeps elements in one flat array of slots, avoiding the chained table's extra dependent load per node
- [ ] Insert swaps the carried key with any occupant nearer its home slot, keeping each run ordered by home
- [ ] Lookup stops once its distance from home exceeds the occupant's: the key would have displaced that occupant
- [ ] Erase shifts following keys back one slot until a gap or a key at home, so no tombstones pile up
- [ ] Callers lose stable references: a rehash moves elements between slots, invalidating pointers into the map

