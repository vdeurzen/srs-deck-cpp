---
id: value-categories-categories-cloze
kind: cloze
version: 1
level: 1
tags: [value-categories]
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
---

Every C++ expression has both a type and a {{c1::value category::a
property of the expression, not of the object}}. A named variable used in
an ordinary expression has category {{c2::lvalue::a primary category}},
and a bare temporary like `T{}` has category {{c3::prvalue::a primary
category}}.
