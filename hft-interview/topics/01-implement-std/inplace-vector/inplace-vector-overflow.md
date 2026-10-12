---
id: inplace-vector-overflow
kind: basic
version: 1
level: 3
tags: [inplace-vector, c++26, low-latency, implement-std]
elaborate: "On your hot path, what should happen to the 65th order: drop it, reject it upstream, or spill it somewhere slower?"
requires:
  - algo-systems/seq-inline-capacity
refs:
  - https://en.cppreference.com/w/cpp/container/inplace_vector/push_back
  - https://en.cppreference.com/w/cpp/container/inplace_vector/try_push_back
  - https://eel.is/c++draft/inplace.vector.modifiers
  - https://wg21.link/P0843R14
---

## `std::inplace_vector<Order, 64>` (C++26) keeps its 64 slots inside the object and never allocates. What does `push_back` do with the 65th order?

---

**It throws `std::bad_alloc` and leaves the vector unchanged.**
The capacity can't grow, so "full" is an error. For a hot path without
exceptions, `try_push_back` returns an empty `std::optional<T&>` when
full and appends nothing. (P0843R14 returned a pointer; the C++26 draft
changed it.)
