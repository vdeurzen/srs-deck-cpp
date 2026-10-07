---
id: const-constexpr-constexpr-function-dual-use-cloze
kind: cloze
version: 1
level: 2
tags: [const-constexpr-consteval]
requires:
  - const-constexpr-const-vs-constexpr-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/constexpr
---

A `constexpr` function is not a promise that every call happens at compile
time, only that it {{c1::could::a modal verb}}. Called with arguments that
are themselves constant expressions, in a context that requires one (an
array bound, a `static_assert`), it runs at {{c2::compile time}}. Called
with a value read from `std::cin`, the very same body runs at
{{c3::run time}}, like any other function.
