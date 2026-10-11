---
id: types-auto-brace-list
kind: basic
version: 1
level: 2
tags: [types, auto, initialization]
requires:
  - types-auto-drops-const
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://eel.is/c++draft/dcl.type.auto.deduct#2
elaborate: Where in your code would a variable silently becoming a list instead of a number first fail to compile, or fail to warn?
---

## In C++23, `auto a{5};` makes `a` an `int`. What type does `auto b = {5};` give `b`?

---

**`std::initializer_list<int>`, a one-element list, not a number.** With
`= { ... }`, `auto` deduces a list type. Direct braces with a single
element deduce that element's type (since C++17); with two elements,
`auto c{1, 2};` is ill-formed. For a plain value write `auto b = 5;` or
`auto b{5};`.
