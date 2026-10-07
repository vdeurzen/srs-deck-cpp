---
id: value-categories-reference-binding-cloze
kind: cloze
version: 1
level: 2
tags: [value-categories, references]
requires:
  - value-categories-categories-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/reference
---

A non-const lvalue reference `T&` can only bind to an {{c1::lvalue}}. A
`const T&` can bind to {{c2::an lvalue or an rvalue::which categories?}}.
An rvalue reference `T&&` binds to an {{c3::rvalue (xvalue or
prvalue)::a composite category}}.
