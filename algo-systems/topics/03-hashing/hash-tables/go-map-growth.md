---
id: hash-go-map-growth
kind: basic
version: 2
level: 4
requires:
  - interview-essentials/hashing-load-factor
  - interview-essentials/complexity-amortised-single-call
tags: [hashing, low-latency, tail-latency]
elaborate: For a hot-path map whose final size you cannot know, what would you do instead of hoping the stall lands somewhere harmless?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/rehash
  - https://en.cppreference.com/w/cpp/container/unordered_map/reserve
---

## A `std::unordered_map<int, int>` grows to 10 million entries. Inserts average about 300 ns, but one takes about 400 ms. What happened on that insert?

---

**It pushed the load factor past `max_load_factor`: the map rehashed every entry at once.**

Growth is amortised O(1), not O(1) each: the slow insert relinks all
~6 million nodes into about twice as many buckets. `reserve(n)` up front
removes it. Measured with GCC 16.2, `-O2`.
