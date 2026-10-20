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
  - const-ref-names-caller
  - vc-plain-ref-rejects-temporary
  - iter-range-for-intro
  - constexpr-fn-static-assert
elaborate: Find a function in your code that takes a `std::string` or vector by value only to read it; what would `const&` save?
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://eel.is/c++draft/dcl.init.ref#5
---

`count_spaces` only reads its text, and callers pass temporaries such as
`count_spaces(std::string("a b c"))`. Complete the parameter so that no
call ever copies the string.

```cpp
#include <string>
constexpr int count_spaces({{c1::const std\::string&}} text) {
  int n = 0;
  for (char ch : text) if (ch == ' ') ++n;
  return n;
}
```

---

**`const std::string&`: it names the caller's string, copies nothing,
and binds to a temporary.** A plain `std::string&` rejects
`std::string("a b c")`, because only a reference to `const` binds a
temporary. By value, with or without `const`, works but copies every
character on each call.
