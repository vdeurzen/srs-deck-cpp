---
id: types-overflow-rules
kind: cloze
version: 1
level: 1
tags: [types, integers, overflow]
requires:
  - types-signed-unsigned-range
  - ub-definition
elaborate: Where in your code could a signed counter overflow, and what may the compiler then assume about that code?
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://eel.is/c++draft/basic.fundamental#2
  - https://eel.is/c++draft/expr.pre#4
---

When an integer result does not fit its type, the two families part ways.
For an `unsigned` type the result {{c1::wraps around modulo 2ᴺ::what happens to it}}
(N = the type's width in bits): after `unsigned u = UINT_MAX; ++u;`
(`UINT_MAX` is the largest `unsigned` value),
`u` is {{c1::0}}.
For a signed type such as `int`, the overflow is
{{c2::undefined behaviour::the standard's term}}.
