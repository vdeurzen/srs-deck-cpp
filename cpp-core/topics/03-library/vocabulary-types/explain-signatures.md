---
id: vocab-explain-signatures
kind: explain
version: 1
level: 3
tags: [vocabulary-types, error-handling]
requires:
  - vocab-expected-and-then
  - vocab-span-parameter
  - vocab-visit-missing-handler
refs:
  - https://en.cppreference.com/w/cpp/utility
---
Explain how C++23's vocabulary types let a function signature say what the
caller gets back or lends. For each, name the bug it prevents.
---
- [ ] `optional<T>`: a value or nothing; replaces sentinels (`-1`, `nullptr`) a caller could mistake for real values
- [ ] `expected<T, E>`: a value or a typed reason for failure, the error built with `std::unexpected` so it can't pass for a value
- [ ] `and_then` chains steps that can themselves fail without nested checks; the first error short-circuits the rest
- [ ] `span<const T>`: borrows any contiguous range without a copy; it owns nothing, so the caller must keep the data alive
- [ ] `variant<A, B, C>`: one of a closed set, stored in place; `visit` makes an unhandled alternative a compile error
