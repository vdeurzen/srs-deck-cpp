---
id: types-constexpr-catches-uninit
kind: code
version: 1
level: 2
tags: [types, initialization, constexpr]
input: chips
choices:
  c1: ["int sum{};", "int sum;", "int sum();", "auto sum = {0};"]
compile:
  harness: |
    static_assert(digit_sum(472) == 13);
    int main() {}
requires:
  - types-uninit-local-read
  - types-auto-brace-list
refs:
  - https://en.cppreference.com/w/cpp/language/value_initialization
  - https://en.cppreference.com/w/cpp/language/constant_expression
  - https://eel.is/c++draft/expr.const
---

Complete the declaration of the running total so the compile-time check
`digit_sum(472) == 13` passes.

```cpp
#include <initializer_list>
constexpr int digit_sum(int n) {
  {{c1::int sum{};}}
  while (n > 0) { sum += n % 10; n /= 10; }
  return sum;
}
```

---

**Empty braces value-initialize: an `int` gets `0`.** Plain `int sum;`
leaves it indeterminate; at compile time reading it is rejected outright
("not usable in a constant expression"), at run time it is undefined
behaviour. `int sum();` declares a function, not a variable, and
`auto sum = {0};` makes a `std::initializer_list<int>`, which has no `+=`.
