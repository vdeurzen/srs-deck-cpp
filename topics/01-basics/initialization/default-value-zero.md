---
id: initialization-default-value-zero
kind: basic
version: 1
level: 2
tags: [initialization]
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://en.cppreference.com/w/cpp/language/value_initialization
---

## For `int x;` versus `int x{};`, what is `x`'s value in each case, and why?

---

`int x;` is **default-initialization**: for a built-in type at block scope
this performs *no* initialization at all — `x` holds indeterminate memory,
and reading it before writing is undefined behaviour.

`int x{};` is **value-initialization**: for a scalar type this zero-initializes,
so `x` is guaranteed to be `0`. The empty braces are doing real work, not
just standing in for "default".

The distinction matters more for class types: a class with no user-declared
default constructor and only implicitly-defaulted members is still
zero-initialized member-by-member under `T{}`, but left indeterminate under
`T t;` for any member of scalar type.
