---
id: vocab-expected-carries-error
kind: basic
version: 1
level: 2
tags: [vocabulary-types, expected, error-handling]
requires:
  - vocab-optional-maybe-value
refs:
  - https://en.cppreference.com/w/cpp/utility/expected
---

## `parse_port(text)` fails on empty text, on non-digits, or out of range, and the caller reacts differently to each. Why is `std::optional<int>` the wrong return type?

---

**`optional` can only say "no value"; it cannot say *why*.**

Return `std::expected<int, PortError>` instead: either the port or an error
value of a type you choose. The failure reasons are visible in the signature
and travel by value, with no exception and no out-parameter.
