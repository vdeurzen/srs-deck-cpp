---
id: class-pimpl
kind: basic
version: 1
level: 3
tags: [classes, idioms, compile-time]
requires:
  - class-invariant-constructor
  - linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/language/pimpl
elaborate: Which header in your codebase triggers the most rebuilds when it changes? Would hiding its private members behind a pointer be worth one allocation per object?
---

## `class Widget { struct Impl; std::unique_ptr<Impl> p_; ... };` (PIMPL). What does it trade?

---

**Buys: private changes don't touch the header. Costs: a heap allocation and an indirection.**

Members live in `Impl`, defined only in `widget.cpp`, so editing them
recompiles one file and keeps `sizeof(Widget)` and the ABI stable. Every
object pays an allocation, and every member access a pointer hop.
