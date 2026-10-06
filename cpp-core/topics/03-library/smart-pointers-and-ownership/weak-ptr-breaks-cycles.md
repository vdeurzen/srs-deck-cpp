---
id: smart-pointers-weak-ptr-breaks-cycles
kind: basic
version: 1
level: 3
tags: [smart-pointers]
requires:
  - smart-pointers-shared-ptr-control-block
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
---

## Why does a parent/child pair of `shared_ptr`s pointing at each other leak, and how does `weak_ptr` fix it?

---

If a `Parent` holds a `shared_ptr<Child>` and that `Child` holds a
`shared_ptr<Parent>` back, each object's strong reference count never
reaches zero — the parent keeps the child alive, and the child keeps the
parent alive, even once nothing outside the pair refers to either. Neither
destructor ever runs: a reference-counting cycle leaks exactly like a
garbage collector would if it only counted references.

`weak_ptr` observes an object managed by `shared_ptr` **without
contributing to the strong count**. The `Child` holds a `weak_ptr<Parent>`
instead; when the last external `shared_ptr<Parent>` goes away, the
strong count reaches zero and `Parent` is destroyed regardless of the
`Child`'s `weak_ptr`. Using the value back requires `lock()`, which
returns a `shared_ptr` that is null if the object is already gone —
`weak_ptr` never dereferences a dangling pointer for you.
