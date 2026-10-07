---
id: smart-pointers-explain-weak-ptr
kind: explain
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-cycle-leaks
  - smart-pointers-weak-ptr-breaks-cycles
  - smart-pointers-weak-ptr-lock
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
---
Explain what `std::weak_ptr` is for: the leak it exists to prevent, and
how it is used safely.
---
- [ ] Two objects owning each other through `shared_ptr` form a cycle: each strong count stays at one after every outside owner is gone, so neither is ever destroyed
- [ ] Reference counting cannot see the cycle; the fix is structural: the owner points down with `shared_ptr`, the owned points back up with `weak_ptr`
- [ ] A `weak_ptr` observes without owning: it does not touch the strong count, so it never keeps the object alive — it only keeps the control block alive (the weak count)
- [ ] It cannot be dereferenced; `lock()` returns a `shared_ptr` that is empty if the object is gone and otherwise owns it for the duration of use
- [ ] The other use is an observer or cache that must not keep objects alive: it holds `weak_ptr`s, the owner deletes freely, and the cache learns of the deletion at its next `lock()` instead of dangling
