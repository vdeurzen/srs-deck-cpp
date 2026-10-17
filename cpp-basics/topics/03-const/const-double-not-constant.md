---
id: const-double-not-constant
kind: code
version: 1
level: 2
tags: [const, constexpr, constant-expressions]
input: chips
choices:
  c1: ["constexpr", "const", "static const", "inline const"]
compile:
  harness: |
    int main() {}
requires:
  - cpp-essentials/const-vs-constexpr-initializer
refs:
  - https://en.cppreference.com/w/cpp/language/constant_expression#Usable_in_constant_expressions
  - https://eel.is/c++draft/expr.const
---

The initializer `2.5` is a literal, known at compile time. Complete the
declaration so the `static_assert` may read `scale`.

```cpp
{{c1::constexpr}} double scale = 2.5;
static_assert(scale * 2 == 5.0);
```

---

`const int n = 4;` happens to be usable at compile time: a `const`
**integer** (or enumeration) variable with a constant initializer is a
special case. A `const double` is not, whatever its initializer, so the
`static_assert` is rejected. `constexpr` makes any literal-type variable
usable in constant expressions, and states the intent. Prefer it whenever
you mean "compile-time constant".
