---
id: vec-reserve-contract
kind: cloze
version: 2
level: 2
tags: [vector, reserve, implement-std]
requires:
  - cpp-essentials/iter-size-vs-capacity
elaborate: Say to an interviewer why `reserve` may not change `size()`, and what a caller would break if it did.
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/vector.capacity#3
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---

`reserve(n)` asks a vector for room for `n` elements; your `Vec::reserve`
must match `std::vector`'s contract. Start from an empty `std::vector<int> v`:

- After `v.reserve(10);`, `v.size()` is {{c1::0}}.
- A further `v.reserve(4);` leaves `v.capacity()` {{c2::unchanged}}.

---

`reserve` changes only the capacity, never the size, so indexing past
`size()` afterwards is still out of bounds. It reallocates only when `n`
is greater than `capacity()`; it never shrinks the buffer.
