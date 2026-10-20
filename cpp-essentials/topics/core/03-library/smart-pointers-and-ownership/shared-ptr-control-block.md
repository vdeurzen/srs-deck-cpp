---
id: smart-pointers-shared-ptr-control-block
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership]
requires:
  - smart-shared-ptr-intro
elaborate: What would break if each copy carried its own count?
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr#Implementation_notes
  - https://eel.is/c++draft/util.sharedptr
---

## Why does `std::shared_ptr` keep its reference count in a separate heap control block instead of inside each `shared_ptr` object?

---

**So every copy sees one shared count; a count inside each copy changes only that copy.**
Every copy holds two pointers, one to the object and one to the same
block, and bumps that block's count. The owner that takes the count to
zero destroys the object.
