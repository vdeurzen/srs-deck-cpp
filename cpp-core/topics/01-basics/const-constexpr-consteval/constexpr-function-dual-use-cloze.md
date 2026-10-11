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

Declaring a function `constexpr` promises nothing about any particular
call, only that a call {{c1::could::a modal verb}} appear in a constant
expression. Called with arguments that
are themselves constant expressions, in a context that requires one (an
array bound, a `static_assert`), it runs at {{c2::compile time}}. Called
with a value read from `std::cin`, the very same body runs at
{{c3::run time}}, like any other function.
