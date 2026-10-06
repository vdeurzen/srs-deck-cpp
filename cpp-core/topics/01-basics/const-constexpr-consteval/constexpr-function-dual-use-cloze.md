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
time — only that it {{c1::could::is permitted to run at compile time when
its arguments allow it}}. Called with arguments that are themselves
constant expressions, in a context that requires one (such as an array
bound or a `static_assert`), it runs at {{c2::compile time}}. Called with
an ordinary runtime value, the very same function body runs at
{{c3::runtime::just like a normal function}}, with no special guarantee of
evaluation time.
