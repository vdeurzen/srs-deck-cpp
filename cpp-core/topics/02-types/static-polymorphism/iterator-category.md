---
id: staticpoly-iterator-category
kind: basic
version: 1
level: 2
tags: [iterators, concepts]
refs:
  - https://en.cppreference.com/w/cpp/iterator
  - https://en.cppreference.com/w/cpp/iterator/random_access_iterator
---

## `std::advance(it, 1000)` is one step for a `std::vector` iterator but a thousand for a `std::list` one. What property of the iterator decides that?

---

**Its category: only a random-access iterator supports `it += n` in
constant time.**

A `std::list` iterator is bidirectional: it can only `++` and `--`. Each
category is a C++20 concept (`std::random_access_iterator`,
`std::bidirectional_iterator`, …) and, before that, a tag type.
