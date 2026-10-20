---
id: vocab-variant-intro
kind: basic
version: 2
level: 1
tags: [vocabulary-types, variant]
requires:
  - string-basics
refs:
  - https://en.cppreference.com/w/cpp/utility/variant
  - https://eel.is/c++draft/variant.variant.general
elaborate: Where in Go would you have used an `any` value with a type switch, and what does a variant's fixed list of types add?
---

```cpp
std::variant<int, std::string> v = 3;
v = "hi";
```

## What happens to the `int` 3 when the second line runs?

---

**It is destroyed: a variant holds exactly one of its listed types at a time.**

Assigning a value of another alternative ends the `int`'s life and
stores a `std::string` `"hi"` in the same object. The variant remembers which of its
types is active, so it never holds two at once.
