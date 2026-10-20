---
id: hashing-reserve-trace
kind: basic
version: 2
level: 3
tags: [hashing, load-factor]
requires:
  - hashing-grow-amortised
elaborate: Where in a latency-sensitive service would you call reserve, and what does a too-high estimate cost you?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/reserve
---

A hash table starts with 8 buckets and rehashes every stored key into
twice as many buckets whenever an insert would push its load factor past
1.0. It is about to receive 100 000 inserts, a number known in advance.

## Inserts are already amortised O(1). What does calling `reserve(100000)` before the first insert change?

---

**No single insert pays an O(n) rehash: it removes latency spikes.**

Without it, the 9th, 17th, 33rd, … inserts each rehash every key stored
so far. Reserving moves that work before the first insert. The total was
already O(n), so throughput barely changes. `std::unordered_map::reserve`
does this.
