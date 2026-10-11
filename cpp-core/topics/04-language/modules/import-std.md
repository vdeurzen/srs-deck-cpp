---
id: modules-import-std
kind: cloze
version: 1
level: 2
tags: [modules]
elaborate: Importing a module brings in no macros. Which `#include`s (`<cassert>`, `<cerrno>`) would your code still need next to it?
requires:
  - modules-import-vs-include
refs:
  - https://en.cppreference.com/w/cpp/standard_library
  - https://wg21.link/P2465R3
---

C++23 lets one line, {{c1::`import std;`::one declaration}}, replace
every standard `#include`: the whole library's declarations become
available at once, compiled once instead of re-parsed per file.
