---
id: types-brace-narrowing-intro
kind: basic
version: 1
level: 1
tags: [types, initialization, narrowing]
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
  - https://eel.is/c++draft/dcl.init.list#7
---

## `T x{v};` is brace initialisation of `x` from `v`. Exactly one of these lines fails to compile. Which one?

```cpp
int a = 3.9;
int b{3.9};
int c{3};
```

---

**`int b{3.9};`: braces reject a narrowing conversion, one that can lose the value.**

`int a = 3.9;` compiles and silently drops the fraction: `a` is 3.
Braces turn that silent loss into a compile error. (GCC makes it an error
for a constant like `3.9`; from a non-constant variable it only warns.)
