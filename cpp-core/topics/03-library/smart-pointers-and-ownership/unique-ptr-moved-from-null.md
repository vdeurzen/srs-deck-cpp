---
id: smart-pointers-unique-ptr-moved-from-null
kind: basic
version: 1
level: 2
tags: [smart-pointers, move-semantics]
requires:
  - smart-pointers-unique-ptr-ownership
  - move-semantics-moved-from-state
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr/unique_ptr
  - https://eel.is/c++draft/unique.ptr.single.ctor
---

## After `auto b = std::move(a);` on a `std::unique_ptr`, is `a` merely "valid but unspecified", like a moved-from `std::string`?

---

**No: `a` is guaranteed null (`a.get() == nullptr`).** Exclusive
ownership demands it: `b` now owns the object, so `a` must own nothing,
or two destructors would delete it. The standard states this as a
postcondition, so `if (a)` after a move is a reliable test.
`shared_ptr` promises the same: a moved-from one is empty.
