---
id: types-literal-suffix
kind: code
version: 1
level: 2
tags: [types, literals, overflow]
input: chips
choices:
  c1: ["LL", "L", "u"]
compile:
  harness: |
    #include <type_traits>
    static_assert(ns == 5'000'000'000LL);
    static_assert(std::is_same_v<decltype(ns), const long long>);
    int main() {}
requires:
  - cpp-essentials/types-overflow-rules
refs:
  - https://en.cppreference.com/w/cpp/language/integer_literal
  - https://eel.is/c++draft/lex.icon
---

Without a suffix, both literals below are `int` and the multiplication
overflows. Add a suffix so the product is computed in a type wide enough
that it cannot overflow, on every platform.

```cpp
constexpr auto ns = 5'000 * 1'000'000{{c1::LL}};
```

---

An unsuffixed literal like `1'000'000` is an `int`, and `int * int` is
computed in `int`, whatever variable receives it: writing
`long long ns = ...` would not help, because the overflow happens before
the store. `LL` makes the literal `long long`, so the other operand is
converted and the product fits. `L` gives `long`, which is only 32 bits
on Windows; `u` makes the product wrap modulo 2³².
