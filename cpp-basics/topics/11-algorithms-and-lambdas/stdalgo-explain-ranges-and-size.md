---
id: stdalgo-explain-ranges-and-size
kind: explain
version: 1
level: 2
tags: [algorithms, iterators, containers]
requires:
  - iter-end-one-past
  - stdalgo-transform-back-inserter
  - stdalgo-erase-if
refs:
  - https://en.cppreference.com/w/cpp/algorithm
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---
Explain how standard algorithms such as `transform` and `remove_if` see a
container, and what that means for its size.
---
- [ ] They receive a half-open range `[begin, end)`: `begin` is included, `end` is one past the last element
- [ ] They reach elements only through iterators, so they can never add or remove a container's elements
- [ ] `transform` needs an output with room for every result, or `std::back_inserter` to append them
- [ ] `remove_if` only moves the kept elements to the front and returns the new logical end; the size is unchanged
- [ ] `std::erase_if(container, pred)` takes the container itself, so it removes the matches and shrinks the size in one call
