---
id: move-semantics-implicit-move-suppressed
kind: basic
version: 2
level: 2
tags: [move-semantics, special-members]
requires:
  - move-semantics-rule-of-five
  - value-categories-reference-binding-cloze
  - class-default-delete-where
  - string-basics
elaborate: Say aloud what you would add to a class whose destructor only logs, so it stays cheap to move, and why nothing warns you otherwise.
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
  - https://eel.is/c++draft/class.copy.ctor
---

`std::move(x)` only casts `x` to an rvalue, which lets a move constructor be chosen.

## `Log` declares only a destructor. Which constructor builds `b`: copy, move, or neither (no compile)?

```cpp
struct Log {
    ~Log() {}
    std::string buf;
};
Log a;
Log b = std::move(a);
```

---

**The copy constructor: declaring the destructor suppresses the implicit move constructor.**

A declared copy constructor, copy assignment or move assignment does the
same. `std::move(a)` still compiles: the xvalue binds the copy
constructor's `const Log&`, so `buf` is copied and nothing warns.
`Log(Log&&) = default;` brings the move back.
