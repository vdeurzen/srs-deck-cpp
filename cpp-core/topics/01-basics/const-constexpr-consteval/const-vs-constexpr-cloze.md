---
id: const-constexpr-const-vs-constexpr-cloze
kind: cloze
version: 1
level: 1
tags: [const-constexpr-consteval]
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/constexpr
---

`const` promises only that a value is {{c1::not modified after
initialization}} — its initializer may still be a runtime computation,
like reading a file. `constexpr` promises more: the value must be
{{c2::computable at compile time::when is it known?}}, so its
initializer is restricted to expressions the compiler can evaluate itself.
Every `constexpr` variable is implicitly {{c3::const}}, but not every
`const` variable is `constexpr`.
