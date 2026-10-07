---
id: transfer-nil-to-optional
kind: basic
version: 1
level: 2
tags: [transfer, misconception, vocabulary-types]
requires:
  - vocab-optional-maybe-value
elaborate: Which Go functions of yours return `*T` only so they can return nil, and would the C++ port need the pointer at all?
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
---

## Go's `func find(id int) *User` returns nil for "no such user". Ported line for line as `User* find(int id)`, what must every caller know that the signature does not say?

---

**Who owns the returned `User`, and that it must check for null.**

Go's collector made the pointer free of ownership questions; a C++ raw
pointer is not. `std::optional<User>` holds the value itself, so there is
no owner to name, and "no user" is a state the caller tests.
