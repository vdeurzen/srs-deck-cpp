---
id: lru-explain-cache
kind: explain
version: 2
level: 4
tags: [hft, lru, caching, design]
requires:
  - lru-design-worked
  - trace-lru-order
  - lru-std-list-allocates
  - lru-touch
refs:
  - https://leetcode.com/problems/lru-cache/
  - https://en.cppreference.com/w/cpp/container/list/splice
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
elaborate: Which cache or table in a system you know evicts by recency, and would its hot path tolerate an allocation on every miss?
---
An interviewer on a low-latency team asks you to design an LRU cache
that every request will go through. Answer aloud.
---
- [ ] A hash map alone cannot find the oldest key; a list alone cannot find a key without walking it
- [ ] Keep a list in recency order plus a hash map from each key to its list node
- [ ] A list plus hash map makes every operation O(1), but `std::list` and `unordered_map` allocate twice per miss
- [ ] Slot arrays linked by index, with a sentinel slot, reuse the evicted key's slot, so a miss allocates no node
- [ ] (empty: tick this)
