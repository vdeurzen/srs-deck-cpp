---
id: variadic-fold-forms
kind: cloze
version: 1
level: 2
tags: [templates, variadic, c++17]
requires:
  - variadic-what-is-a-pack
refs:
  - https://en.cppreference.com/w/cpp/language/fold
  - https://eel.is/c++draft/expr.prim.fold
---

A **fold expression** combines every element of a pack with one binary
operator, and must always be written {{c1::inside its own parentheses::punctuation}}.
In `(xs - ...)` the pack comes first, so the operators nest to the
{{c2::right::direction}}: `x1 - (x2 - x3)`. Writing an initial value on
the outer side, as in `(0 + ... + xs)`, makes it a
{{c3::binary::how many operands around the `...`}} fold.
