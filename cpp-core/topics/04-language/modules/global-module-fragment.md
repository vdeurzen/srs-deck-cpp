---
id: modules-global-module-fragment
kind: cloze
version: 1
level: 3
tags: [modules]
requires:
  - modules-interface-unit-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/modules
  - https://eel.is/c++draft/module.global.frag
---

A module unit that needs a classic header with macros, such as `<cassert>`,
starts with a line holding only {{c1::`module;`::a declaration}}. The
`#include`s go between that line and `export module geometry;`, in the
{{c2::global module fragment::a region of the unit}}, so the header's
macros work inside the unit but are not exported with it.
