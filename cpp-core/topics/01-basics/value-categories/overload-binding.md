---
id: value-categories-overload-binding
kind: basic
version: 1
level: 2
tags: [value-categories, overload-resolution]
requires:
  - value-categories-reference-binding-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://en.cppreference.com/w/cpp/language/reference
---

## Given both `void f(const T&)` and `void f(T&&)` overloads, which one binds for a named parameter `T&& x` used inside the function body?

---

**`f(const T&)`: the expression `x` is an lvalue.** `T&&` is the declared
*type* of `x`; naming a variable in an expression yields an lvalue whatever
its type. So rvalue-ness never passes on for free: the next call needs
`std::move(x)` (or `std::forward` in a template).
