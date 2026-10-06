---
id: vocab-expected-unexpected
kind: code
version: 1
level: 2
tags: [vocabulary-types, expected, error-handling]
input: chips
choices:
  c1: ["std::unexpected(PortError::empty)", "PortError::empty", "{}", "-1"]
compile:
  harness: |
    static_assert(parse_port("8080").value() == 8080);
    static_assert(parse_port("").error() == PortError::empty);
    int main() {}
requires:
  - vocab-expected-carries-error
  - class-explicit-constructor
refs:
  - https://en.cppreference.com/w/cpp/utility/expected/unexpected
---

Report the empty input as a `PortError` the caller can read back with
`.error()`.

```cpp
#include <expected>
#include <string_view>
enum class PortError { empty, out_of_range };
constexpr std::expected<int, PortError> parse_port(std::string_view digits) {
    if (digits.empty()) return {{c1::std\::unexpected(PortError\::empty)}};
    int port = 0;
    for (char c : digits) port = port * 10 + (c - '0');
    return port;
}
```

---

`std::unexpected(e)` marks a value as the error. Without it the return value
is taken as the success value: `-1` becomes a "valid" port and `{}` a port
of `0`, the sentinel bug again. `PortError::empty` alone fails only because a scoped
enum doesn't convert to `int`; with an `int` error type it would silently
become a value too. That is why the error side needs its own wrapper.
