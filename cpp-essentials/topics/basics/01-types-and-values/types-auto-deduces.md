---
id: types-auto-deduces
kind: basic
version: 1
level: 1
tags: [types, auto]
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://eel.is/c++draft/dcl.spec.auto
---

## What type does each variable get?

```cpp
auto n = 7;
auto r = 2.5;
auto c = 'x';
```

---

**`int`, `double`, `char`: `auto` takes the type of the initializer.**

The literal decides: `7` is an `int`, `2.5` a `double`, `'x'` a `char`.
The type is fixed at compile time. With no
initializer there is nothing to deduce from, so `auto n;` does not compile.
