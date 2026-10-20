---
id: linkage-odr-counting
kind: cloze
version: 1
level: 2
tags: [linkage, odr]
requires:
  - linkage-inline-header-fix
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://eel.is/c++draft/basic.def.odr
elaborate: Say why the rule lets a class be defined in every file that uses it, but not an ordinary function.
---

The one-definition rule. A non-`inline` function or global variable that
the program uses is defined in exactly
{{c1::one::a number}} translation unit. A class, or an
`inline` function, may be defined in every translation unit that uses it,
provided all those definitions are
{{c3::identical::or the program is broken, and no tool need say so}}.
