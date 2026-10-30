---
id: iter-explain-vector-growth
kind: explain
version: 2
level: 2
tags: [containers, vector, iterators]
elaborate: Say which loop in your own code you would add `reserve` to, and what that saves.
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
- [ ] Every element lives side by side in one buffer, so appending needs free room at its end
- [ ] While size is below capacity, `push_back` writes into the same buffer, as after `reserve(4)`
- [ ] When size equals capacity, `push_back` allocates a bigger buffer and transfers every element into it
- [ ] That one `push_back` takes time proportional to the size
- [ ] The reallocation leaves every iterator, pointer and reference into the old buffer dangling
