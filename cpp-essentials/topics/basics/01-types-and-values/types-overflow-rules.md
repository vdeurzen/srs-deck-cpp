---
id: types-overflow-rules
kind: cloze
version: 1
level: 1
tags: [types, integers, overflow]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://eel.is/c++draft/basic.fundamental#2
  - https://eel.is/c++draft/expr.pre#4
---

When an integer result does not fit its type, the two families part ways.
For an `unsigned` type the result {{c1::wraps around modulo 2ᴺ::what happens to it}}.
For a signed type such as `int`, the overflow is
{{c2::undefined behaviour::the standard's term}}.
