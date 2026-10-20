---
id: vocab-expected-carries-error
kind: basic
version: 1
level: 2
tags: [vocabulary-types, expected, error-handling]
requires:
  - vocab-optional-maybe-value
  - vocab-expected-intro
  - err-throw-catch-intro
elaborate: Pick a function of yours that returns an empty value on failure; what would its caller do differently if it learned why?
refs:
  - https://en.cppreference.com/w/cpp/utility/expected
---

## `parse_port(text)` fails on empty text, on non-digits, or out of range, and the caller reacts differently to each. In C++23, why is `std::optional<int>` the wrong return type?

---

**`optional` can only say "no value"; it cannot say *why*.**

Return `std::expected<int, PortError>` instead: either the port or an
error value of a type you choose, so the reasons are visible in the
signature and travel by value, with no exception and no extra reference
parameter for the callee to fill in.
