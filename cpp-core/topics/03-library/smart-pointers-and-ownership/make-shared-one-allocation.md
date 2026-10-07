---
id: smart-pointers-make-shared-one-allocation
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-control-block
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared#Notes
---

## `std::shared_ptr<W>(new W)` versus `std::make_shared<W>()`: what does `make_shared` save?

---

**One allocation: the object and its control block share a single block
of memory.** Two allocations become one, and object and counts sit
together in cache. There is no raw `new W` in your code, so nothing to
wrap twice or leak. The cost: the object's storage cannot be freed until
the last `weak_ptr` goes, because it *is* the block.
