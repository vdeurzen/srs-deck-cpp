---
id: value-categories-third-category
kind: basic
version: 1
level: 1
tags: [value-categories]
requires:
  - value-categories-categories-cloze
  - move-vs-copy-intro
elaborate: Say aloud why an expression that still names `n` cannot simply be a prvalue.
refs:
  - https://en.cppreference.com/w/cpp/language/value_category#xvalue
  - https://eel.is/c++draft/basic.lval#1
---

`std::move(n)` is a cast that marks `n` as safe to move from.

```cpp
int n = 4;
n;              // A
n + 1;          // B
std::move(n);   // C
```

## A is an lvalue and B a prvalue. Which value category is C?

---

**An xvalue: neither lvalue nor prvalue, the third primary category.**

C still names the object `n`, which no prvalue does, yet unlike plain
`n` it marks that object as one whose contents may be taken.
