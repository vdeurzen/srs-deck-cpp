---
id: smart-pointers-shared-ptr-control-block
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership]
requires:
  - life-shared-ptr-owners
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr#Implementation_notes
  - https://eel.is/c++draft/util.sharedptr
---

## Why does `std::shared_ptr` keep its reference count in a separate heap control block instead of inside each `shared_ptr` object?

---

**So every copy sees one shared count; a count inside each copy changes only that copy.**
Every copy points at the same block, which also holds the weak count and
the type-erased deleter: a `shared_ptr` is two pointers wide, object and
block. Strong count zero: the deleter runs. Weak count zero: the block goes.
