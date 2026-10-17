---
id: tmpl-header-which-invalid
kind: basic
version: 1
level: 1
tags: [templates]
requires:
  - cpp-essentials/tmpl-function-syntax
refs:
  - https://en.cppreference.com/w/cpp/language/template_parameters
---

## Exactly one of these declarations fails to compile. Which one?

```cpp
template <typename T>             T first(T a, T b);
template <class T>                T second(T a, T b);
template <typename A, typename B> A third(A a, B b);
template <typename T>             T fourth(U a, T b);
```

---

**`fourth`: `U` was never declared as a template parameter.** Only the
names in the template's own angle brackets are types inside it.
`class T` means exactly the same as `typename T`, and a template may take
several parameters, each deduced from its own argument.
