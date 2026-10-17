---
id: move-semantics-vector-move-if-noexcept
kind: basic
version: 1
level: 3
tags: [move-semantics, exceptions, containers]
requires:
  - exceptions-strong-vs-basic
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back#Exceptions
  - https://en.cppreference.com/w/cpp/utility/move_if_noexcept
---

## `std::vector<W>` reallocates. `W` is copyable and its move constructor is not `noexcept`. Does the vector move or copy the old elements?

---

**It copies them.** Reallocation transfers elements one by one; a throw
halfway would leave some moved out with no way back, and `push_back`'s
strong guarantee would be gone. So `std::move_if_noexcept` picks the copy
constructor unless the move is `noexcept` (or the type cannot be copied,
when it moves regardless). One throwing member makes a defaulted move
throwing too.
