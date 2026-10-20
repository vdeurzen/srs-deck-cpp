---
id: vocab-expected-intro
kind: basic
version: 1
level: 1
tags: [vocabulary-types, error-handling]
requires:
  - types-enum-no-int
  - strings-string-view-intro
elaborate: Name a function of yours that can fail for more than one reason; which values would its error enum list?
refs:
  - https://en.cppreference.com/w/cpp/utility/expected
  - https://eel.is/c++draft/expected.expected
---

```cpp
enum class PortError { empty, not_digits, too_big };
std::expected<int, PortError> parse_port(std::string_view text);
```

## `parse_port("80x")` fails on the `x`. What does the object it returns hold?

---

**The `PortError` value `not_digits`, in place of an `int`.**

`std::expected<T, E>` (C++23, header `<expected>`) holds either the
expected `T` or an error `E`, never both, inside itself. A successful call
would hold the port; this one holds the reason it failed.
