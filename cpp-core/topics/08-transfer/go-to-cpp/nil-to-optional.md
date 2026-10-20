---
id: transfer-nil-to-optional
kind: basic
version: 1
level: 2
tags: [transfer, misconception, vocabulary-types]
requires:
  - cpp-essentials/vocab-optional-maybe-value
elaborate: Which lookups in your own code return a pointer only to signal "not found", and what would `std::optional` change for their callers?
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
---

## `User* find(int id)` returns `nullptr` for "no such user". What must every caller know that the signature does not say?

---

**Who owns the returned `User`, and that it must check for null.**

A raw pointer says nothing about who deletes the object or whether null
is possible. `std::optional<User>` holds the value itself, so there is
no owner to name, and "no user" is a state the caller tests.
