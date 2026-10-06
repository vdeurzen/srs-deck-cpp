---
id: coroutines-scheduling-structured-concurrency
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, lifetimes]
requires:
  - coroutines-parameters-copied
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://wg21.link/p2300
---

## What does "structured concurrency" buy a coroutine runtime that has no global scope object to park detached work in?

---

**The lifetime argument: a child's frame is nested inside its parent's
`co_await`.** If every child is awaited by its parent, it may borrow a
`std::span` over the parent's local buffer (the parent is suspended,
not gone); cancellation flows top-down, with no work outliving its
requester; and a child's exception surfaces at the parent's
`co_await`, not in a detached `unhandled_exception()`.
