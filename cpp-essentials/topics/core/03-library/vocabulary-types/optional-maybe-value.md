---
id: vocab-optional-maybe-value
kind: basic
version: 1
level: 1
tags: [vocabulary-types, optional, error-handling]
requires:
  - ptr-reference-vs-pointer
  - life-stack-vs-heap
elaborate: Say aloud what a caller of a Go `(User, bool)` return must remember that `std::optional<User>` makes the type itself carry.
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
---

## `find_user(id)` may legitimately find no one. Which return type puts "no one" in the signature, without a sentinel value (a special value such as `-1` meaning "none") or a heap allocation?

---

**`std::optional<User>`: it holds a `User` in place, or nothing.**

A sentinel (`-1`, an empty `User`) is an ordinary value the caller can
forget is special. `optional` puts "maybe nothing" in the type, so the
caller must check before reading a `User`; the `User` lives inside the
`optional` itself, not on the heap.
