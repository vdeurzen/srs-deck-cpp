---
id: move-semantics-forwarding-reference
kind: basic
version: 1
level: 3
tags: [move-semantics, templates]
requires:
  - value-categories-reference-binding-cloze
  - tmpl-deduction-conflict
elaborate: Say aloud how you tell, from a signature alone, whether a `&&` parameter can take an lvalue.
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Forwarding_references
  - https://eel.is/c++draft/temp.deduct.call
---

A reference to a reference collapses to a single reference, and `&` wins: `Widget& &&` is `Widget&`.

## For a class `Widget`, `f(w)` compiles for an lvalue `w` and `g(w)` does not. What makes `T&&` different from `Widget&&`?

```cpp
template<class T> void f(T&& x);
void g(Widget&& x);
```

---

**`T` is deduced from the argument, making `T&&` a forwarding
reference.** For an lvalue `Widget`, `T` deduces as `Widget&` and
`Widget& &&` collapses to `Widget&`; for an rvalue, `T` is `Widget` and
`T&&` stays an rvalue reference. `Widget&&` names no deduced type, so it
binds rvalues only.
