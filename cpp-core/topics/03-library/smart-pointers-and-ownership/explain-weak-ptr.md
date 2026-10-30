---
id: smart-pointers-explain-weak-ptr
kind: explain
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - cpp-essentials/smart-pointers-shared-ptr-cycle-leaks
  - cpp-essentials/smart-pointers-weak-ptr-breaks-cycles
  - cpp-essentials/smart-pointers-weak-ptr-lock
elaborate: Where in a design you know does one object point back at its owner, and which pointer type does that link use?
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
---
A colleague asks what `std::weak_ptr` is for. Explain it to them.
---
- [ ] Two objects owning each other through `shared_ptr` keep both counts at one, so neither is ever destroyed
- [ ] Making the back-pointer a `weak_ptr` breaks that cycle: the owner points down, the owned points back up weakly
- [ ] A `weak_ptr` observes without adding to the owner count, so it never keeps the object alive
- [ ] It cannot be dereferenced; `lock()` returns a `shared_ptr` that is empty if the object is gone
- [ ] A cache or observer holds `weak_ptr`s, so the owner deletes freely and the next `lock()` reports it
