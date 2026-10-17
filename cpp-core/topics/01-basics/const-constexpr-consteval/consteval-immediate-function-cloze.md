---
id: const-constexpr-consteval-immediate-function-cloze
kind: cloze
version: 1
level: 3
tags: [const-constexpr-consteval]
requires:
  - cpp-essentials/const-constexpr-constexpr-function-dual-use-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/consteval
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#15
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#17
  - https://eel.is/c++draft/format.fmt.string
---

A function declared `consteval` is an {{c1::immediate function::C++20
term}}. Unlike a `constexpr` function, a call to it from ordinary
(non-`consteval`) code must itself be a {{c2::constant expression}}, or
the program is {{c3::ill-formed::a conformance term}}. The constructor of
`std::basic_format_string` is declared this way.
