---
id: lru-explain
kind: explain
version: 1
level: 5
tags: [hft, lru, caching, design, interview]
requires:
  - lru-evict-map
  - lru-std-list-allocates
  - algo-systems/hash-tombstone-buildup
refs:
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://abseil.io/about/design/swisstables
---
The interviewer: "Implement an LRU cache with O(1) get and put. It runs
on the hot path, so nothing may allocate after start-up." Walk through
the data structures and both operations.
---
- [ ] Names a fixed slot array allocated up front, linked by index around a sentinel, because a hit then unlinks and relinks a slot without allocating
- [ ] Names a full-cache miss reusing the least recent slot in place, erasing the victim's key from the map first, because a stale entry would hit another key's slot
- [ ] Names the textbook `std::list` plus `std::unordered_map` LRU as allocating, because each miss frees and allocates a node in both containers
- [ ] Names a pre-sized open-addressed key → slot map that must keep tombstones in check, because every miss erases a key and tombstones lengthen probes until the table rehashes
- [ ] Names the access pattern that defeats LRU, a loop over more keys than slots, because each access evicts the key needed next
