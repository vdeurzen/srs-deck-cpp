---
id: move-semantics-forwarding-reference
kind: basic
version: 1
level: 3
tags: [move-semantics, templates]
requires:
  - value-categories-reference-binding-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Forwarding_references
  - https://eel.is/c++draft/temp.deduct.call
---

## `f(w)` compiles for an lvalue `w` and `g(w)` does not. What makes `T&&` different from `Widget&&`?

```cpp
template<class T> void f(T&& x);
void g(Widget&& x);
```

---

**`T` is deduced from the argument, making `T&&` a forwarding
reference.** For an lvalue `Widget`, `T` deduces as `Widget&` and
`Widget& &&` collapses to `Widget&`; for an rvalue, `T` is `Widget` and
`T&&` stays an rvalue reference. Only a bare `T&&` with `T` deduced by
that call (or `auto&&`) qualifies — not `const T&&`, `std::vector<T>&&`,
or a class template's `T&&`.
