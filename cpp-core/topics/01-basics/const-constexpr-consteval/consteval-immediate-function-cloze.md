---
id: const-constexpr-consteval-immediate-function-cloze
kind: cloze
version: 1
level: 3
tags: [const-constexpr-consteval]
requires:
  - const-constexpr-constexpr-function-dual-use-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/consteval
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#15
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#17
---

A function declared `consteval` is an {{c1::immediate function::C++20
term}}. Unlike a `constexpr` function, a call to it from ordinary
(non-`consteval`) code must itself be a {{c2::constant expression}}, or
the program is {{c3::ill-formed::a conformance term}}: there is no
run-time fallback. (C++23 relaxes this for `constexpr` templates and
lambdas: such a caller quietly becomes immediate itself.) That suits
values that must be known during translation, such as a checked format
string.
