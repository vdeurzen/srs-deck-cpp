---
id: smart-pointers-explain-unique-ptr
kind: explain
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-unique-ptr-ownership
  - smart-pointers-unique-ptr-moved-from-null
  - smart-pointers-sink-parameter
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---
Explain `std::unique_ptr` to a colleague coming from a garbage-collected
language: what it guarantees, what a move does to it, and what its
presence in a signature says.
---
- [ ] Exclusive ownership: exactly one `unique_ptr` owns the object and its destructor deletes it — RAII for a heap object, with no `delete` in user code
- [ ] Copy constructor and copy assignment are deleted, so a second owner (and the double delete it would cause) is a compile error, not a runtime bug
- [ ] A move transfers ownership and leaves the source null — guaranteed by the standard, not merely "valid but unspecified" — so `if (p)` after a move is reliable
- [ ] A by-value `unique_ptr` parameter is a sink: the callee takes ownership and the caller must `std::move` (or pass a temporary); the signature documents the hand-over
- [ ] `T&` or `T*` parameters borrow and say nothing about ownership; a `unique_ptr&` parameter means the callee may *reseat* it (replace what it owns), so it is wrong for a function that only uses the object
