---
id: lru-explain
kind: explain
version: 2
level: 5
tags: [hft, lru, caching, design, interview]
requires:
  - lru-evict-map
  - interview-essentials/lru-std-list-allocates
  - algo-systems/hash-tombstone-buildup
refs:
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://abseil.io/about/design/swisstables
elaborate: Name an access pattern that makes LRU evict exactly the key needed next, and what policy you would try instead.
---
The interviewer: "Implement an LRU cache with O(1) get and put. It runs
on the hot path, so nothing may allocate after start-up." Walk through
your design.
---
- [ ] Names a slot array allocated up front, linked by index around a sentinel, so nothing allocates after start-up
- [ ] Names `get` as a map lookup, then unlinking the slot and relinking it at the front, all O(1)
- [ ] Names a full-cache miss reusing the least recent slot, erasing the victim's key first, or a stale entry hits it
- [ ] Rejects `std::list` plus `std::unordered_map`, since each miss frees and allocates a node in both
- [ ] Names a pre-sized open-addressed key-to-slot map, kept clear of tombstones, since every miss erases a key
