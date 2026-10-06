---
id: containers-default-to-vector
kind: basic
version: 1
level: 1
tags: [containers]
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container
---

## You need a sequence of `Order`s, appended at the back and scanned often. With no other requirement, which standard container do you reach for?

---

**`std::vector<Order>`: its elements sit contiguously in one buffer.**

A scan then walks memory in order, which caches and prefetchers reward, and
indexing is one address computation. `std::list` and `std::deque` earn their
place only for a guarantee `vector` lacks, such as references that survive
insertion.
