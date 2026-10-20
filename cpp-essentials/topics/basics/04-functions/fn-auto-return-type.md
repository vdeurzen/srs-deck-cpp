---
id: fn-auto-return-type
kind: basic
version: 1
level: 1
tags: [functions, auto, types]
requires:
  - types-auto-deduces
  - cast-static-cast-intro
refs:
  - https://en.cppreference.com/w/cpp/language/function#Return_type_deduction
  - https://eel.is/c++draft/dcl.spec.auto
elaborate: When would you spell a function's return type out instead of writing `auto`, for the reader of your header?
---

```cpp
auto scale(int n) { return n * 1.5; }
```

## What is `scale`'s return type?

---

**`double`: an `auto` return type is deduced from the `return` expression.**
`n * 1.5` has one `double` operand, so `n` converts and the product is a
`double`. The type is still fixed at compile time. If a function has
several `return`s, each must deduce the same type, or it does not
compile.
