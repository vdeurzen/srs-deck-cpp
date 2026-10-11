---
id: tmpl-why-template
kind: basic
version: 1
level: 1
tags: [templates]
refs:
  - https://en.cppreference.com/w/cpp/language/function_template
---

## You have this function and now need the same thing for `double` and `std::string`. What lets you write the body once instead of three times?

```cpp
int larger(int a, int b) { if (a < b) return b; return a; }
```

---

**A function template, with the type as a parameter.**

```cpp
template <typename T>
T larger(T a, T b) { if (a < b) return b; return a; }
```

`T` is a placeholder. For each type the function is called with, the
compiler generates an ordinary function (`larger<int>`,
`larger<double>`, ...). The body must still make sense for that type:
here, `T` needs a `<`.
