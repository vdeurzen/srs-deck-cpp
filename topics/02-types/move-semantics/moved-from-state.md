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

Only that `a` is left in a **valid but unspecified state**. It is safe to
destroy or assign a new value to `a` — every standard-library type's
destructor and copy/move-assignment work on a moved-from object — but
reading `a`'s value is not required to give anything predictable, and for
most standard containers it will typically be empty, though that is a
common implementation choice, not a promise.

Using `a` for anything other than destruction or reassignment after moving
from it is a logic error even when it happens not to crash: the class
author decides what "moved-from" means for their type, and standard types
only promise the object is left in *some* destructible, assignable state.
