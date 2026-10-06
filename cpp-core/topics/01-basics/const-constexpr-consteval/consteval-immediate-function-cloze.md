---
id: const-constexpr-consteval-immediate-function-cloze
kind: cloze
version: 1
level: 3
tags: [const-constexpr-consteval]
requires:
  - const-constexpr-const-vs-constexpr-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/consteval
---

A function declared `consteval` is an {{c1::immediate function::C++20
term}}: unlike `constexpr`, every call must be a constant expression, or
the program is {{c2::ill-formed::a compile error, not a fallback to
runtime}}. This is the right tool when a value must be known during
translation no matter what — for example validating a format string —
rather than merely being {{c3::allowed}} to be.
