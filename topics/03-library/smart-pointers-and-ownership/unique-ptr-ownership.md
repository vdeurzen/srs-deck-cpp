---
id: smart-pointers-unique-ptr-ownership
kind: basic
version: 1
level: 1
tags: [smart-pointers]
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---

## What ownership model does `std::unique_ptr<T>` enforce, and what does that mean for copying it?

---

**Exclusive ownership**: at any moment, at most one `unique_ptr` owns a
given object, and that owner deletes it when the `unique_ptr` is
destroyed. Enforcing exclusivity means `unique_ptr` has no copy
constructor or copy assignment at all — copying would create a second
owner, which the type exists specifically to rule out.

It is **movable**: moving a `unique_ptr` transfers ownership to the
destination and leaves the source null, so ownership stays unique
throughout the transfer. This makes it essentially free — no reference
counting, no atomic operations — which is why it should be the default
smart pointer, reached for `shared_ptr` only when ownership genuinely
needs to be shared.
