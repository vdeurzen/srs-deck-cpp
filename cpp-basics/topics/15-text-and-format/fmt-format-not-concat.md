---
id: fmt-format-not-concat
kind: code
version: 1
level: 1
tags: [strings]
input: chips
choices:
  c1:
    - "\"({}, {})\""
    - "\"({x}, {y})\""
    - "\"({1}, {2})\""
    - "\"({0}, {})\""
compile:
  harness: |
    int main() { (void)point(3, 4); }
refs:
  - https://en.cppreference.com/w/cpp/utility/format/format
  - https://eel.is/c++draft/format.string.general
---

Complete the call so that `point(3, 4)` returns `"(3, 4)"`.

```cpp
#include <format>
#include <string>
std::string point(int x, int y) {
  return std::format({{c1::"({}, {})"}}, x, y);
}
```

---

**`"({}, {})"`**: the format string is the output's shape, and each `{}`
is replaced by the next argument, converted for you: no `to_string`, no
chain of `+`. A `{}` holds no name (`{x}` is an error); a number inside
counts from **0**, so `{2}` names a third argument that does not exist;
and numbered and bare `{}` cannot be mixed in one string. All three are
caught when the call compiles.
