---
id: hashing-average-vs-worst
kind: basic
version: 1
level: 2
tags: [hashing, complexity]
requires:
  - hashing-load-factor
  - hashing-open-addressing
elaborate: "Which service of yours hashes keys that an outsider controls, and what would a flood of colliding keys do to it?"
refs:
  - https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
---

## A hash table lookup is O(1) on average. What input makes it O(n)?

---

**Keys that all hash to the same bucket.** The lookup then scans one
chain (or one probe run) holding every key.

The O(1) assumes the hash spreads keys evenly and growth keeps the load
factor bounded. An attacker who chooses the keys can break the first assumption on
purpose.
