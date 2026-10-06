---
id: vocab-optional-nullopt
kind: code
version: 1
level: 1
tags: [vocabulary-types, optional]
input: chips
choices:
  c1: ["std::nullopt", "-1", "false", "nullptr"]
compile:
  harness: |
    static_assert(digit_value('7') == 7);
    static_assert(digit_value('0') == 0);
    static_assert(!digit_value('x').has_value());
    int main() {}
requires:
  - vocab-optional-maybe-value
refs:
  - https://en.cppreference.com/w/cpp/utility/optional/nullopt
---

`digit_value('x')` must say "not a digit" with something that is not an
`int` value at all.

```cpp
#include <optional>
constexpr std::optional<int> digit_value(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    return {{c1::std\::nullopt}};
}
```

---

`std::nullopt` (or `{}`) builds an empty `optional`. `-1` and `false`
compile, because both convert to `int` and an `int` converts to
`optional<int>`, but they produce a *present* value (`false` becomes `0`, a
real digit): exactly the sentinel confusion the type exists to remove.
`nullptr` is a pointer's "nothing" and does not convert at all.
