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

C++23 lets one line, {{c1::`import std;`::an import declaration}}, replace
every standard `#include`: it makes all the library's declarations in
namespace `std` available, compiled once instead of re-parsed per file.
