---
id: move-semantics-explain-reallocation-copies
kind: explain
version: 1
level: 4
tags: [move-semantics, exceptions, containers]
requires:
  - move-semantics-noexcept-move
elaborate: Which of your own types sit in a growing `std::vector`, and is each one's move constructor `noexcept`?
refs:
  - https://en.cppreference.com/w/cpp/utility/move_if_noexcept
  - https://en.cppreference.com/w/cpp/container/vector/push_back#Exceptions
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
---
A profiler shows a `std::vector<Widget>` deep-copying every element each
time it grows, although `Widget` has a move constructor. Explain to the
team, aloud, why it happens and how to fix it.
---
- [ ] Problem: on reallocation the vector must transfer every element into the new buffer
- [ ] Mechanism: it moves an element only if the move constructor is `noexcept`, otherwise it copies
- [ ] Example: a `Widget` whose move constructor lacks `noexcept` is copied on every growth
- [ ] Trade-off: copying keeps the strong guarantee, since a throw leaves the old buffer intact
- [ ] Pitfall: a defaulted move constructor is not `noexcept` if any member's move may throw
