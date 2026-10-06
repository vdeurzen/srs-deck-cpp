---
id: move-semantics-moved-from-state
kind: basic
version: 1
level: 2
tags: [move-semantics]
refs:
  - https://en.cppreference.com/w/cpp/utility/move
---

## After `auto b = std::move(a);`, what does the standard guarantee about `a`?

---

For a standard-library type, only that `a` is left in a **valid but
unspecified state**: its invariants hold, so any operation without
preconditions works — destroy it, assign to it, call `size()`, `empty()`
or `clear()` — but its *value* is not specified. A moved-from container is
typically empty, but that is an implementation choice, not a promise.

What you must not do is call something with a precondition (`front()`,
`operator[]`, `pop_back()`) without first establishing it, e.g. by
checking `empty()` or reassigning. A few types do specify the moved-from
value: a moved-from `std::unique_ptr` or `std::shared_ptr` is null. For
your own types, the class author decides what "moved-from" means.
