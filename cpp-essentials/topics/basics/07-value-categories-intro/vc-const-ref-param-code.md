---
id: vc-const-ref-param-code
kind: code
version: 1
level: 3
tags: [value-categories, references, parameters]
requires:
  - vc-rvalue-ref-binds-temporaries
  - value-categories-reference-binding-cloze
  - constexpr-fn-static-assert
elaborate: Say which parameter in an interview solution of yours you would write this way, and what a caller could no longer pass if you dropped the `const`.
input: chips
choices:
  c1:
    - "const std::string&"
    - "std::string&"
    - "std::string&&"
compile:
  harness: |
    constexpr bool check() {
      std::string named = "hello!";
      return is_short(make()) && !is_short(named);
    }
    static_assert(check());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f16-for-in-parameters-pass-cheaply-copied-types-by-value-and-others-by-reference-to-const
---

`is_short` only reads its argument. Complete its parameter type so that
it never copies the string, yet callers can pass both a named
`std::string` and the temporary that `make()` returns.

```cpp
#include <string>
constexpr std::string make() { return "hey"; }
constexpr bool is_short({{c1::const std\::string&}} s) {
  return s.size() < 5;
}
```

---

**`const std::string&` binds lvalues and temporaries alike, without a copy.**
`std::string&` refuses the temporary from `make()`; `std::string&&`
refuses the named `named`, an lvalue. Plain `std::string` would accept
both, but copies every call.
