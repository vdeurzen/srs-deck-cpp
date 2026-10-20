---
id: templates-instantiation
kind: basic
version: 1
level: 2
tags: [templates]
requires:
  - tmpl-why-template
refs:
  - https://en.cppreference.com/w/cpp/language/template_instantiation
  - https://eel.is/c++draft/temp.inst
elaborate: Say aloud why a template's definition usually lives in a header rather than in a `.cpp` file.
---

## This template is defined, yet the object file (the compiler's output for one `.cpp`) holds no code for it. What makes the compiler generate a `twice` for `int`?

```cpp
template<class T>
T twice(T x) { return x + x; }
```

---

**Using it with `int`, such as `twice(3)`: implicit instantiation.**

It happens wherever a definition is needed. The compiler substitutes `int` for `T` and generates a real function, once
per distinct set of template arguments. The template itself is not code;
each function generated from it is.
