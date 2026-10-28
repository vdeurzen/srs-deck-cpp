---
id: algmix-failed-to-back
kind: basic
version: 1
level: 3
tags: [algorithms, choosing]
requires:
  - part-keep-order
  - container-erase-if-intro
  - stdalgo-sort-basics
elaborate: Say which of the three requirements you would drop to make plain `std::partition` enough.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_partition
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---

## A `std::vector` of orders must have the rejected ones moved to the back, both groups kept in arrival order, and every order kept. Which standard call?

---

**`std::stable_partition`, with a test that is true for the accepted orders.**

Cue: two groups, nothing lost, order kept inside each. `std::erase_if`
would delete the rejected orders; `std::partition` keeps both groups but
may reorder inside them; `sort` would order by a key, not by arrival.
