---
id: class-converting-constructor
kind: cloze
version: 1
level: 1
tags: [classes, constructors, conversions]
requires:
  - class-constructor-intro
elaborate: Where in your code could a number or string silently become one of your class types, and would you want that?
refs:
  - https://en.cppreference.com/w/cpp/language/converting_constructor
---

With `struct Celsius { Celsius(double d); };` and `void heat(Celsius c);`,
the call `heat(21.5)` compiles: the compiler {{c2::creates a nameless,
temporary `Celsius` from `21.5`::what does it build before the call?}} and passes
that. A constructor callable with one argument, which lets the compiler
do this silently, is a {{c1::converting constructor::a standard term}}.
