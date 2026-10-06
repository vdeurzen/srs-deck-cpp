---
id: smart-pointers-shared-ptr-control-block
kind: basic
version: 1
level: 2
tags: [smart-pointers]
requires:
  - smart-pointers-unique-ptr-ownership
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/enable_shared_from_this
---

## What does a `shared_ptr`'s control block hold, and why do two `shared_ptr`s constructed separately from the same raw pointer cause a double free?

---

The control block holds the strong reference count, the weak reference
count, and (unless `make_shared` folded it into the same allocation) a
pointer to the managed object and, often, its deleter. Every `shared_ptr`
that is a copy of another **shares the same control block**, which is how
the count stays accurate.

`std::shared_ptr<T> a(raw); std::shared_ptr<T> b(raw);` constructs **two
independent control blocks**, each believing it is the sole owner and
each with a count of one. Both destructors run, both delete `raw`: a
double free. The fix is always to copy an existing `shared_ptr`, never to
re-wrap the same raw pointer.
