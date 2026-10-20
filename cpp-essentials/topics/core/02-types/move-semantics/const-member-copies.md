---
id: move-semantics-const-member-copies
kind: basic
version: 1
level: 2
tags: [move-semantics, special-members]
requires:
  - value-categories-reference-binding-cloze
  - move-vs-copy-intro
  - vector-basics
  - string-basics
elaborate: Say in one sentence, as to an interviewer, why marking a data member `const` can make a class slower to move.
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
  - https://eel.is/c++draft/class.copy.assign
---

`std::move(x)` only casts `x` to an rvalue, which lets a move constructor be chosen.

## The last line moves `a` into `b`. What happens to `key`?

```cpp
struct Row {
    const std::string key;
    std::vector<int> vals;
};
Row a{"user-id", {1, 2, 3}};
Row b = std::move(a);
```

---

**`key` is copied; `vals` is moved.** The defaulted move constructor
initialises each member from the corresponding xvalue. A
`const std::string` xvalue cannot bind `std::string&&`, but it binds
`const std::string&`, so `std::string`'s copy constructor runs for that member.
Silent, decided per member: a `const` member is never moved, only copied.
