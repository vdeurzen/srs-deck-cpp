---
id: part-keep-order
kind: basic
version: 1
level: 3
tags: [algorithms, rearranging]
requires:
  - part-partition-intro
elaborate: Say when you would pay for keeping the order, and when `partition` is enough, in code you have written.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_partition
  - https://en.cppreference.com/w/cpp/algorithm/partition
---

Rows arrive as `(Ann, fail) (Bob, ok) (Cat, fail) (Dan, ok)`. They must
be split with the "ok" rows first, and Bob arrived before Dan.

## `std::partition` or `std::stable_partition`: which guarantees Bob stays before Dan?

---

**`std::stable_partition`: it keeps the input order within each group.**

That is what *stable* means. `partition` promises only the groups, and
its swaps may reorder inside one; libstdc++ gives `Dan Bob Cat Ann`.
`stable_partition` may allocate a buffer and costs more, and it isn't
`constexpr` before C++26.
