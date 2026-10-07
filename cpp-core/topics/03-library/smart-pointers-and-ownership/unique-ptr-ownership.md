---
id: smart-pointers-unique-ptr-ownership
kind: basic
version: 1
level: 1
tags: [smart-pointers, ownership]
requires:
  - raii-copy-double-close
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://eel.is/c++draft/unique.ptr
---

## `std::unique_ptr<Node> b = a;` does not compile. What property of `unique_ptr` does that error protect?

---

**Exclusive ownership: at most one `unique_ptr` owns an object, and its
destructor deletes it.** A copy would be a second owner — two `delete`s
of one object — so the copy constructor and copy assignment are deleted
and the mistake fails to compile. Transferring ownership is a different
operation: `std::move(a)`, after which `a` owns nothing.
