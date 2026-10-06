---
id: strings-format-checked
kind: code
version: 1
level: 2
tags: [strings, format]
input: chips
choices:
  c1: ["name, id", "id, name", "name", "name, std::to_string(id)"]
requires:
  - strings-format-placeholders
  - const-constexpr-consteval-immediate-function-cloze
compile:
  harness: |
    int main() { (void)label("ada", 7); }
refs:
  - https://en.cppreference.com/w/cpp/utility/format/format
  - https://en.cppreference.com/w/cpp/utility/format/basic_format_string
  - https://en.cppreference.com/w/cpp/utility/format/spec
---

Supply the arguments so that `label("ada", 7)` returns `"ada (#0007)"`.

```cpp
#include <format>
#include <string>
#include <string_view>
std::string label(std::string_view name, int id) {
    return std::format("{0} (#{1:04})", {{c1::name, id}});
}
```

---

The format string is checked **at compile time** against the argument
types (`std::format_string` is built by a `consteval` constructor). `{1:04}`
asks for zero-padding to width 4, which only arithmetic types accept, so
passing a string there (swapped, or pre-converted with `std::to_string`) is
a compile error, and so is referring to argument `1` when only one is
passed. With `printf`, both mistakes compile and fail
at run time.
