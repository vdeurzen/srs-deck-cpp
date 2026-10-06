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

The `const T&` overload — even though `x`'s declared *type* is `T&&`, `x`
itself is a named entity, so as an expression it is an **lvalue**. Only the
type of a declaration is a reference; the value category of using that
name in an expression is lvalue, full stop.

This is why forwarding requires `std::move` or `std::forward`: naming a
parameter never hands its rvalue-ness on to the next call for free.
