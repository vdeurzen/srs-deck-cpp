---
id: templates-instantiation
kind: basic
version: 1
level: 2
tags: [templates]
refs:
  - https://en.cppreference.com/w/cpp/language/template_instantiation
  - https://eel.is/c++draft/temp.inst
---

## This template is defined, yet the object file holds no code for it. What makes the compiler generate `twice<int>`?

```cpp
template<class T>
T twice(T x) { return x + x; }
```

---

**Using it with `int` where a definition is needed, such as the call
`twice(3)`: implicit instantiation.**

The compiler substitutes `int` for `T` and generates a real function, once
per distinct set of template arguments. The template itself is not code;
each specialization instantiated from it is.
