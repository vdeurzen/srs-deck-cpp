---
id: smart-pointers-explain-ownership
kind: explain
version: 1
level: 4
tags: [smart-pointers]
refs:
  - https://en.cppreference.com/w/cpp/memory
---
Explain C++'s smart pointer ownership models to a senior interviewer:
`unique_ptr`, `shared_ptr`, and `weak_ptr`, and when to reach for each.
---
- [ ] `unique_ptr`: exclusive ownership, move-only, essentially zero overhead over a raw pointer
- [ ] `shared_ptr`: shared ownership via reference counting; last owner destroyed frees the object
- [ ] The control block holds the strong count, the weak count, and typically the deleter
- [ ] Constructing two `shared_ptr`s from the same raw pointer separately double-frees; always copy an existing `shared_ptr`
- [ ] `make_shared` folds the control block and the object into one allocation, saving an allocation and improving locality
- [ ] `weak_ptr` observes without owning; it does not keep the object alive and cannot be dereferenced directly
- [ ] `weak_ptr::lock()` returns a null `shared_ptr` if the object is already destroyed, avoiding a dangling reference
- [ ] Reference cycles between `shared_ptr`s leak; breaking the cycle with a `weak_ptr` on one side fixes it
- [ ] Default to `unique_ptr`; reach for `shared_ptr` only when ownership is genuinely shared, not for convenience
