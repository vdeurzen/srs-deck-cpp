---
id: modules-interface-unit-cloze
kind: cloze
version: 1
level: 2
tags: [modules]
requires:
  - modules-import-vs-include
  - linkage-internal-linkage
refs:
  - https://en.cppreference.com/w/cpp/language/modules
  - https://eel.is/c++draft/module.unit
---

In the interface unit of module `geometry`, a declaration prefixed with
{{c1::`export`::a keyword}}, such as `double area(double r);`, is visible
to every file that imports `geometry`. An unmarked `double scale(double r);`
in the same unit has {{c2::module linkage::a kind of linkage}}: other units
of `geometry` can call it, importers cannot.
