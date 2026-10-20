---
id: vec-reserve-contract
kind: cloze
version: 1
level: 2
tags: [vector, reserve, implement-std]
requires:
  - cpp-essentials/iter-size-vs-capacity
elaborate: Say to an interviewer why `reserve` may not change `size()`, and what a caller would break if it did.
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/vector.capacity#3
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---

`reserve(n)` asks a vector for room for `n` elements. Your `Vec::reserve(n)`, matching `std::vector`'s contract:

- It reallocates if and only if `n` is {{c1::greater than::a comparison}} `capacity()`.
- It never {{c2::changes::a verb}} `size()`, so indexing past `size()` after `reserve` is still out of bounds.
