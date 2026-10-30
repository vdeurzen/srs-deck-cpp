---
id: smf-token-move-line
kind: basic
version: 1
level: 3
tags: [classes, special-members, move-semantics, misconception]
requires:
  - move-semantics-implicit-move-suppressed
  - class-default-delete-where
elaborate: Say aloud when you would write `= delete` on a move constructor, and when you would just leave it undeclared.
refs:
  - https://en.cppreference.com/w/cpp/language/function#Deleted_functions
  - https://eel.is/c++draft/dcl.fct.def.delete#2
  - https://eel.is/c++draft/class.copy.ctor#10
---

`std::move(x)` only casts `x` to an rvalue, which lets a move constructor be chosen.

Many expect a deleted move to act like a missing one.

```cpp
struct Token {
    Token() = default;
    Token(const Token&) = default;
    Token(Token&&) = delete;
};
Token a;
Token b = std::move(a);
```

## Which constructor builds `b`: copy, move, or none (compile error)?

---

**None, a compile error: the deleted move constructor is still chosen, then rejected.**

`= delete` still declares it; `Token&&` beats `const Token&` for an
xvalue, then the call is rejected. Undeclared, the copy would win.
