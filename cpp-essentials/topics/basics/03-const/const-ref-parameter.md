---
id: const-ref-parameter
kind: code
version: 1
level: 1
tags: [const, references, functions]
input: chips
choices:
  c1: ["const std::string&", "std::string&", "std::string", "const std::string"]
compile:
  harness: |
    #include <type_traits>
    static_assert(count_spaces(std::string("a b c")) == 2);
    static_assert(std::is_same_v<decltype(count_spaces), int(const std::string&)>);
    int main() {}
requires:
  - ptr-reference-must-bind
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://eel.is/c++draft/dcl.init.ref#5
---

`count_spaces` only reads its text. Complete the parameter so the caller's
string is never copied, and a temporary string can still be passed.

```cpp
#include <string>
constexpr int count_spaces({{c1::const std\::string&}} text) {
  int n = 0;
  for (char ch : text) if (ch == ' ') ++n;
  return n;
}
```

---

A **reference to `const`** names the caller's object without copying it
and promises not to change it. Only a `const` reference may bind to a
temporary, so a plain `std::string&` rejects `std::string("a b c")`. By
value (with or without `const`) works but copies every character on each
call.
