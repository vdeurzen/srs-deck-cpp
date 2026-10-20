---
id: value-categories-reference-binding-cloze
kind: cloze
version: 1
level: 2
tags: [value-categories, references]
requires:
  - value-categories-taxonomy
  - vc-rvalue-ref-binds-temporaries
elaborate: Which parameter in your own code takes `const T&` so that callers can pass temporaries, and what would `T&` break?
refs:
  - https://en.cppreference.com/w/cpp/language/reference
---

A non-const `int&` can only bind to {{c1::an lvalue::a value category}}.
A `const int&` can bind to {{c2::an lvalue or an rvalue::which categories?}}.
An `int&&` binds only to {{c3::an rvalue (xvalue or prvalue)::a composite
category}}.
