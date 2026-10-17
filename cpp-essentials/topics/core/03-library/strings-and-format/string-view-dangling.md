---
id: strings-string-view-dangling
kind: code
version: 1
level: 2
tags: [strings, string-view, lifetime]
input: chips
choices:
  c1: ["std::string", "std::string_view", "const std::string&", "const char*"]
compile:
  harness: |
    static_assert(make_greeting("ada") == "hello, ada");
    int main() {}
requires:
  - strings-string-view-parameter
  - ptr-dangling
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
  - https://en.cppreference.com/w/cpp/string/basic_string
---

The caller must be able to read the greeting after `make_greeting` returns.
Complete the return type.

```cpp
#include <string>
#include <string_view>
constexpr {{c1::std\::string}} make_greeting(std::string_view name) {
    std::string s = "hello, ";
    s += name;
    return s;
}
```

---

Ask who owns the characters. They live in the local `s`, which is destroyed
when the function returns, so only a type that **owns a copy** survives:
`std::string`. A `string_view` or `const std::string&` would point into the
dead `s` (silent at run time, a compile error in this constant-evaluated
harness), and `const char*` doesn't convert from `std::string` at all. Taking
`string_view` *in* is fine; handing one *out* to a local is the bug.
