---
id: vocab-optional-maybe-value
kind: basic
version: 1
level: 1
tags: [vocabulary-types, optional, error-handling]
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
---

## `find_user(id)` may legitimately find no one. Which return type puts "no one" in the signature, without a sentinel value or a heap allocation?

---

**`std::optional<User>`: it holds a `User` in place, or nothing.**

A sentinel (`-1`, `nullptr`, an empty `User`) is an ordinary value the caller
can forget is special. `optional` makes the check part of using it:
`if (auto u = find_user(id))` or `u.value_or(guest)`. Dereferencing an empty
one with `*u` is undefined behaviour.
