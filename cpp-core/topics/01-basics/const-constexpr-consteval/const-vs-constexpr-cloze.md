---
id: const-constexpr-const-vs-constexpr-cloze
kind: cloze
version: 1
level: 1
tags: [const-constexpr-consteval]
requires:
  - cpp-basics/const-vs-constexpr-initializer
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/constexpr
---

`const` promises only that a value is {{c1::not modified after
initialization}}; its initializer may be anything, such as a size read
from a file. `constexpr` promises more: the value must be
{{c2::computable at compile time::when is it known?}}, so
`constexpr int seed = std::rand();` is rejected. A `constexpr` variable is
also implicitly {{c3::const}}.
