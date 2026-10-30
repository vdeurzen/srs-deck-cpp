---
id: smf-order-two-lines
kind: basic
version: 1
level: 3
tags: [classes, special-members, const]
requires:
  - life-copy-init-not-assign
  - const-no-modify
  - class-default-delete-where
elaborate: Say what you would change in a class whose `const` member stops it from being stored in a container you sort, and what you would lose.
refs:
  - https://eel.is/c++draft/class.copy.assign#7
  - https://en.cppreference.com/w/cpp/language/copy_assignment
---

## `Order` declares no special members. Which of lines 1 and 2 compiles: line 1, line 2, both, or neither?

```cpp
struct Order {
    const int id;
    double qty;
};
Order a{1, 2.5};
Order b = a;   // line 1
b = a;         // line 2
```

---

**Only line 1: the implicit copy assignment is deleted, because `id` is `const`.**

Line 1 builds `b`, so its `id` is just initialised. Line 2 would
overwrite the `const` member of a live object, so the compiler declares
copy (and move) assignment `= delete`. A reference member, which cannot
be re-bound, does the same.
