---
id: containers-mixed-trades-by-time
kind: basic
version: 1
level: 3
tags: [containers, mixed-recognition]
requires:
  - containers-map-vs-unordered-map
  - containers-default-to-vector
elaborate: Say when a sorted `std::vector` would beat a node-based container for this job.
refs:
  - https://en.cppreference.com/w/cpp/container/map/lower_bound
  - https://en.cppreference.com/w/cpp/container/map
---

## Trades arrive keyed by timestamp, one at a time; a report asks for every trade between 09:30 and 10:00. Which standard container holds them?

---

**`std::map` keyed by timestamp: sorted keys make "from 09:30" one `lower_bound`.**

Cue: a range of keys. `std::unordered_map` has no key order, so the
report would scan every trade. A `std::vector` kept sorted also works, but
each insert in the middle shifts the elements after it.
