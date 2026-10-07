---
id: move-semantics-moved-from-state
kind: basic
version: 1
level: 2
tags: [move-semantics]
requires:
  - value-categories-std-move-cloze
refs:
  - https://en.cppreference.com/w/cpp/utility/move
  - https://eel.is/c++draft/lib.types.movedfrom
---

## After `auto b = std::move(a);`, what does the standard guarantee about `a`?

---

**Valid but unspecified** (for a standard-library type): its invariants
hold, so anything without a precondition works — destroy it, assign to
it, call `size()`, `empty()`, `clear()` — but its *value* is unknown.
Usually empty; never promised. Before `front()` or `pop_back()`,
re-establish the precondition: test `empty()`, or assign. For your own
types, the author decides.
