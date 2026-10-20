---
id: containers-default-to-vector
kind: basic
version: 1
level: 1
tags: [containers]
requires:
  - iter-size-vs-capacity
  - vector-basics
elaborate: Say, as to an interviewer, which guarantee would make you leave `std::vector` for another container.
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container
---

## You need a sequence of `Order`s, appended at the back and scanned often. With no other requirement, which standard container do you reach for?

---

**`std::vector<Order>`: its elements sit contiguously in one buffer.**

Each element sits right after the previous one, like an array, so a scan
reads memory in order (what the hardware serves fastest) and indexing is one
address computation. Leave `vector` only for a guarantee it lacks, such as
references that survive insertion.
