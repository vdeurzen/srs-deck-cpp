---
id: move-semantics-explain-reallocation-copies
kind: explain
version: 2
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
- [ ] On reallocation the vector must transfer every element into the new buffer
- [ ] It moves an element only if the move constructor is `noexcept`, otherwise it copies
- [ ] Copying keeps the strong guarantee: if a copy throws, the old buffer is still intact
- [ ] The fix is marking `Widget`'s move constructor `noexcept`, so the vector moves instead
- [ ] A defaulted move constructor is not `noexcept` if any member's move may throw
