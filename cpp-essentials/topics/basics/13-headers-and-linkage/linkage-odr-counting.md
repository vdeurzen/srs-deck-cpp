---
id: linkage-odr-counting
kind: cloze
version: 2
level: 2
tags: [linkage, odr]
requires:
  - linkage-inline-header-fix
  - linkage-tu-contents
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://eel.is/c++draft/basic.def.odr
elaborate: Say why the rule lets a class be defined in every file that uses it, but not an ordinary function.
---

The one-definition rule. A non-`inline` function or global variable that
the program uses is defined in exactly one translation unit. A class, or an
`inline` function, may be defined in every translation unit that uses it,
provided all those definitions are
{{c1::identical::a requirement on every copy}}.

---

Break that and the program is ill-formed, and no tool need say so: the
linker keeps one copy and never compares them.
