---
id: hashing-grow-amortised
kind: cloze
version: 1
level: 3
tags: [hashing, load-factor, amortised]
requires:
  - hashing-rehash-trace
  - linear-dynamic-array-growth
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/insert
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (dynamic tables)
---

A hash table that has reached its maximum load factor rehashes all n
keys into a bigger bucket array, so that one insert costs O(n). Insert
stays amortised O(1) because the new bucket count is
{{c1::a constant multiple of the old one::how the new size relates to the old}},
the same argument as a dynamic array's `push_back`.

---

With doubling, between two rehashes at least as many inserts happen as
there are keys, so the rehash work spreads to O(1) per insert. `std::unordered_map`
specifies insert as average O(1), worst O(n).
