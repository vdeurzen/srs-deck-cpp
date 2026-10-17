---
id: smart-pointers-weak-ptr-breaks-cycles
kind: basic
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-cycle-leaks
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
---

## Making `Child`'s back-pointer a `weak_ptr<Parent>` fixes the parent/child `shared_ptr` leak. What about `weak_ptr` makes that work?

---

**It observes the object without adding to the strong count.** Only
`shared_ptr`s keep an object alive: when the last outside
`shared_ptr<Parent>` goes, `Parent`'s strong count reaches zero and it is
destroyed, taking its `shared_ptr<Child>` with it — the `Child`'s
`weak_ptr` cannot hold it. Owner points down with `shared_ptr`; owned
points back with `weak_ptr`.
