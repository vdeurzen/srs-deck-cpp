---
id: move-semantics-implicit-move-suppressed
kind: basic
version: 1
level: 2
tags: [move-semantics, special-members]
requires:
  - move-semantics-rule-of-five
  - value-categories-reference-binding-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
  - https://eel.is/c++draft/class.copy.ctor
---

## `Log` declares only a destructor. Does `b` steal `a`'s buffer?

```cpp
struct Log {
    ~Log() { flush(); }
    std::string buf;
};
Log b = std::move(a);
```

---

**No: `buf` is copied.** A user-declared destructor (likewise a copy
constructor, copy assignment or move assignment) means no move
constructor is implicitly declared. `std::move(a)` still compiles: the
xvalue binds the copy constructor's `const Log&`. Nothing warns.
`Log(Log&&) = default;` brings the move back; `= default` for the move
assignment likewise.
