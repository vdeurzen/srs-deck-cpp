---
id: value-categories-categories-cloze
kind: cloze
version: 1
level: 1
tags: [value-categories]
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
---

Every C++ expression has both a type and a {{c1::value category}}. A named
variable used as an expression is an {{c2::lvalue::not a prvalue or xvalue}},
and a bare temporary like `T{}` is a {{c3::prvalue::"pure rvalue" — no
identity}}.
