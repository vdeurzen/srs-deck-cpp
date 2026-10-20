---
id: iter-explain-vector-growth
kind: explain
version: 2
level: 2
tags: [containers, vector, iterators]
elaborate: Say how this compares with Go's `append`, which can also return a slice backed by a new array.
requires:
  - iter-reserve-keeps-buffer
  - iter-growth-invalidates
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---
An interviewer asks how a `std::vector` makes room when you call
`push_back`. Explain it to them.
---
- [ ] Problem: the vector must append at the end while keeping every element side by side in one buffer
- [ ] Mechanism: when size equals capacity, `push_back` allocates a bigger buffer and transfers the elements into it
- [ ] Example: after `reserve(4)`, three `push_back`s all write into the same buffer
- [ ] Cost: a reallocation transfers every element, so that one `push_back` takes time proportional to the size
- [ ] Pitfall: a reallocation leaves every iterator, pointer and reference into the old buffer dangling
