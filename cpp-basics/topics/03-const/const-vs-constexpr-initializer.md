---
id: const-vs-constexpr-initializer
kind: basic
version: 1
level: 1
tags: [const, constexpr]
requires:
  - const-no-modify
refs:
  - https://en.cppreference.com/w/cpp/language/constexpr
  - https://eel.is/c++draft/dcl.constexpr#6
---

## `int read_port();` is an ordinary function. Which line fails to compile?

```cpp
const int a = read_port();
constexpr int b = read_port();
```

---

**The `constexpr` line.** `const` only forbids changing `a` after
initialization; its value may come from run time. `constexpr` demands that
the compiler can compute the value during compilation, and an ordinary
function call cannot be evaluated then.
