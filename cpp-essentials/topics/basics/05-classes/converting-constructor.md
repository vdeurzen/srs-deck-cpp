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

A constructor that can be called with one argument and is not declared
`explicit` is a {{c1::converting constructor::a standard term}}. So with
`struct Celsius { Celsius(double d); };` and `void heat(Celsius c);`, the
call `heat(21.5)` compiles: the compiler {{c2::creates a temporary `Celsius`
from `21.5`::what happens to the `double`?}} and passes that.
