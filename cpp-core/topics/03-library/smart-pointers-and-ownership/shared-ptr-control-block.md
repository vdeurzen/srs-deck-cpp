---
id: smart-pointers-shared-ptr-control-block
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership]
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr#Implementation_notes
  - https://eel.is/c++draft/util.sharedptr
---

## Which three things does a `shared_ptr`'s control block hold that no single `shared_ptr` could hold for itself?

---

**The strong count, the weak count and the type-erased deleter** (plus
the object itself when `make_shared` built it). Every copy of a
`shared_ptr` points at the same block, so the count is shared rather
than per-pointer: a `shared_ptr` is two pointers wide, object and block.
Strong count zero: the deleter runs. Weak count zero: the block goes.
