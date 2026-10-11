---
id: iter-explain-vector-growth
kind: explain
version: 1
level: 2
tags: [containers, vector, iterators]
requires:
  - iter-reserve-keeps-buffer
  - iter-growth-invalidates
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---
Explain what `push_back` does inside a `std::vector`, and what it means for
code that holds an iterator into that vector.
---
- [ ] Distinguishes `size()` (elements that exist) from `capacity()` (slots in the current buffer)
- [ ] With spare capacity, the new element goes into the next slot and the buffer stays put; only `end()` is invalidated
- [ ] When `size() == capacity()`, it allocates a larger buffer, moves or copies the elements across and frees the old one
- [ ] After that reallocation every iterator, pointer and reference into the vector dangles, and using one is undefined behaviour
- [ ] Names a safe alternative: keep an index, re-fetch the iterator after growth, or `reserve` the final size up front
