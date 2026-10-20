---
id: ub-static-assert-finds-ub
kind: cloze
version: 1
level: 1
tags: [undefined-behaviour, constexpr]
refs:
  - https://en.cppreference.com/w/cpp/language/constant_expression
  - https://eel.is/c++draft/expr.const
requires:
  - constexpr-fn-static-assert
  - ub-definition
  - ptr-array-name-to-pointer
elaborate: Say what kind of bug a `static_assert` over a `constexpr` call can catch that a passing unit test cannot, and what it can never see.
---

```cpp
constexpr int third(const int* p) { return p[2]; }
constexpr int two[] = {5, 6};
static_assert(third(two) == 0);   // error, not just "assertion failed"
```

`two` is a compile-time array of two `int`s. To check the `static_assert`, the compiler runs `third(two)` itself, during
{{c1::constant evaluation::a compile-time phase}}. An evaluation that
reaches core-language {{c2::undefined behaviour::the standard's verdict on `p[2]` here}}
is not a constant expression, so the compiler must reject it. Called at
run time, the same read compiles without a word.
