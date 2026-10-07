---
id: smart-pointers-explain-shared-ptr
kind: explain
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-control-block
  - smart-pointers-two-control-blocks
  - smart-pointers-make-shared-one-allocation
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared
---
Explain how `std::shared_ptr` decides when to delete its object, and the
two construction choices that decide whether that works.
---
- [ ] Shared ownership by reference counting: every copy increments the strong count, every destruction decrements it, and the owner that takes it to zero runs the deleter
- [ ] The count lives in a heap control block — with the weak count and the type-erased deleter — that every copy points to; a `shared_ptr` is two pointers, object and block
- [ ] Constructing two `shared_ptr`s from the same raw pointer makes two control blocks, each counting one owner: a double delete; always copy an existing `shared_ptr`
- [ ] `make_shared` allocates the object and the control block together: one allocation instead of two, and no raw pointer in your code to wrap twice
- [ ] Because the deleter is captured in the control block at construction, a `shared_ptr<Base>` copied from a `shared_ptr<Derived>` still deletes the `Derived` — no virtual destructor needed, unlike `unique_ptr<Base>`
