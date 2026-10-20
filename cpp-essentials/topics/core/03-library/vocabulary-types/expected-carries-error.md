---
id: vocab-expected-carries-error
kind: basic
version: 1
level: 2
tags: [vocabulary-types, expected, error-handling]
requires:
  - vocab-optional-maybe-value
  - strings-string-view-parameter
  - err-throw-catch-intro
elaborate: "Compare this to Go's `(int, error)` return: what does `std::expected` make the caller do that Go only asks by convention?"
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

```cpp
std::expected<int, PortError> parse_port(std::string_view text);
```
