---
id: tree-hostile-keys-mixed
kind: basic
version: 1
level: 3
tags: [mixed, problem-recognition]
requires:
  - hashing-average-vs-worst
  - tree-balance-families
  - cpp-essentials/containers-map-vs-unordered-map
elaborate: "Which service of yours takes keys from outside callers, and which lookup structure would you defend there in an interview?"
refs:
  - https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
  - https://en.cppreference.com/w/cpp/container/map
---

## A server keeps 10⁶ sessions keyed by 64-bit ids that clients choose. Sessions open and close all the time, and no lookup may slow down even if a hostile client picks the ids. Which structure holds the sessions?

---

**A balanced search tree (such as `std::map`): O(log n) per operation, whatever the keys.**

A hash table's O(1) is an average that keys chosen to collide break: a
flooded bucket makes each lookup O(n). A balanced tree's height stays
about log₂ n for any insertion order, so about 20 comparisons.
