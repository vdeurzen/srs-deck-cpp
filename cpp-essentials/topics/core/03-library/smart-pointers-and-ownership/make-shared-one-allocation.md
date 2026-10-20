---
id: smart-pointers-make-shared-one-allocation
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-control-block
elaborate: Say, as to an interviewer, why one allocation instead of two matters in code that creates many short-lived shared objects.
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared#Notes
---

## `std::shared_ptr<W>(new W)` versus `std::make_shared<W>()`: what does `make_shared` save?

---

**One allocation: the object and its control block share a single block
of memory.** Two allocations become one. There is no raw `new W` in your code, so nothing to
wrap twice or leak.
