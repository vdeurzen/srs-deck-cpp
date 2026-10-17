---
id: move-semantics-const-member-copies
kind: basic
version: 1
level: 2
tags: [move-semantics, special-members]
requires:
  - value-categories-reference-binding-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
  - https://eel.is/c++draft/class.copy.assign
---

## `Row b = std::move(a);` — what happens to `key`?

```cpp
struct Row {
    const std::string key;
    std::vector<int> vals;
};
```

---

**`key` is copied; `vals` is moved.** The defaulted move constructor
initialises each member from the corresponding xvalue, and a
`const std::string` xvalue cannot bind `std::string&&`, so overload
resolution picks `std::string`'s copy constructor for that member.
Silent, decided per member, and the only way a `const` member can ever
be "moved".
