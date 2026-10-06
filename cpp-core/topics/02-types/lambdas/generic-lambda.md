---
id: lambda-generic
kind: code
version: 1
level: 2
tags: [lambdas, templates]
requires:
  - lambda-closure-type
  - templates-instantiation
input: chips
choices:
  c1: ["const auto&", "const int&", "const double&", "const T&"]
compile:
  harness: |
    static_assert(twice(2) == 4);
    static_assert(twice(1.5) == 3.0);
    static_assert(std::is_same_v<decltype(twice(2)), int>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
---

Complete the parameter so `twice` works for any type with `+`, keeping
the argument's type in the result.

```cpp
#include <type_traits>
constexpr auto twice = []({{c1::const auto&}} x) { return x + x; };
```

---

An `auto` parameter makes the closure's `operator()` a **member function
template**: one instantiation per argument type. A fixed `int` or
`double` parameter converts the argument, changing the result or its
type; a bare `T` is undeclared here. C++20 also lets you name it:
`[]<typename T>(const T& x)`.
