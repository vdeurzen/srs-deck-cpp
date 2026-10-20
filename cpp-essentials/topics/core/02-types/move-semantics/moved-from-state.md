---
id: move-semantics-moved-from-state
kind: basic
version: 1
level: 2
tags: [move-semantics]
requires:
  - value-categories-std-move-cloze
  - class-invariant-who-checks
  - vector-basics
elaborate: Where in your own code is a variable used again after being moved from, and what would you check or assign first?
refs:
  - https://en.cppreference.com/w/cpp/utility/move
  - https://eel.is/c++draft/lib.types.movedfrom
---

A precondition is what must hold before a call, such as "has an element" before `a[0]`.

## `a` is a `std::vector<int>`. After `auto b = std::move(a);`, what does the standard guarantee about `a`?

---

**Valid but unspecified** (for a standard-library type): its invariants
hold, so anything without a precondition works — destroy it, assign to
it, call `size()` — but its *value* is unknown. Usually empty; never
promised. Before `a[0]`, re-establish the precondition: check
`a.size()`, or assign. For your own
types, the author decides.
