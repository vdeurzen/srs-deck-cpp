---
id: const-constexpr-const-vs-constexpr-cloze
kind: cloze
version: 1
level: 1
tags: [const-constexpr-consteval]
requires:
  - const-vs-constexpr-initializer
elaborate: Say aloud which of your program's settings could become `constexpr` and which must stay `const`, and why.
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/constexpr
---

`const` promises only that a value is not {{c1::modified}} after
initialization; its initializer may be anything, such as a size read
from a file. `constexpr` promises more: the value must be
{{c2::computable at compile time::when is it known?}}, so
`constexpr int seed = std::rand();` is rejected (`std::rand()` is the
standard library's random-number function). A `constexpr` variable is
also implicitly {{c3::const}}.
