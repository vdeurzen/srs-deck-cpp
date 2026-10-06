---
id: coroutines-scheduling-context-without-globals
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-scheduling-promise-arguments
  - coroutines-scheduling-schedule-awaiter
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/promise
---

## You refuse to have a global executor. Where can a coroutine's scheduler or I/O context live?

---

**In the awaitable, in the promise, or queried from the promise by the
awaiter.** `co_await read(ring, fd, buf)` names it at every use:
explicit but noisy. `task run(IoContext& io, int fd)` stores it in the
promise from the coroutine's arguments: one mention, but part of the
type's contract. An awaiter templated on the promise type reads
`h.promise()`: context-free, reusable.
