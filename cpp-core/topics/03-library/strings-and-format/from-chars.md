---
id: strings-from-chars
kind: chunk
version: 1
level: 3
tags: [strings, idioms, error-handling]
expose_ms: 10000
compile:
  harness: |
    static_assert([] { int v = 0; return parse_int("42", v) && v == 42; }());
    static_assert([] { int v = 0; return !parse_int("4x", v); }());
    int main() {}
requires:
  - strings-string-view-parameter
refs:
  - https://en.cppreference.com/w/cpp/utility/from_chars
---

```cpp
#include <charconv>
#include <string_view>
constexpr bool parse_int(std::string_view s, int& out) {
  auto [end, ec] = std::from_chars(s.data(), s.data() + s.size(), out);
  return ec == std::errc{} && end == s.data() + s.size();
}
```

---

Parse a whole string as an integer with `std::from_chars`. It reports
failure through an error code (`ec`), never throws, never allocates and
ignores the locale. The second check matters: `from_chars` stops at the
first character it can't use, so `"4x"` parses `4` with no error; only
`end` reaching the end of `s` proves the whole string was a number.
