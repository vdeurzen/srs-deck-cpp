---
id: vec-reserve-contract
kind: cloze
version: 1
level: 2
tags: [vector, reserve, implement-std]
requires:
  - cpp-essentials/iter-reserve-keeps-buffer
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/vector.capacity#3
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---

Your `Vec::reserve(n)`, matching `std::vector`'s contract:

- It reallocates if and only if {{c1::`n > capacity()`::a comparison}}.
- A smaller `n` {{c2::leaves the capacity unchanged::effect on the buffer}}.
