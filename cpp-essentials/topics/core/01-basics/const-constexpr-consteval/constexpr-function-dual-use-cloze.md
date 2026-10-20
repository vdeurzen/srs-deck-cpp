---
id: const-constexpr-constexpr-function-dual-use-cloze
kind: cloze
version: 1
level: 2
tags: [const-constexpr-consteval]
requires:
  - const-constexpr-const-vs-constexpr-cloze
  - constexpr-fn-static-assert
elaborate: Where in your own code could one `constexpr` function serve both a compile-time check and a run-time call, and what would that save you?
refs:
  - https://en.cppreference.com/w/cpp/language/constexpr
---

Declaring a function `constexpr` promises nothing about any particular
call, only that some call {{c1::could::a modal verb}} be evaluated at
compile time. A call is guaranteed to be evaluated then only where the
language requires a {{c2::constant expression::a standard term}}, such as
an array bound or a `static_assert` condition. Called with a value read
from `std::cin` (the standard input stream, read while the program runs),
the same body runs at run time like any other function.
