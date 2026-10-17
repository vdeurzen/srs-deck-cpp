---
id: value-categories-overload-binding
kind: basic
version: 1
level: 2
tags: [value-categories, overload-resolution]
requires:
  - value-categories-reference-binding-cloze
  - vc-named-rvalue-ref-is-lvalue
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://en.cppreference.com/w/cpp/language/reference
---

## Which overload of `f` does the call inside `g` pick?

```cpp
void f(const std::string&);
void f(std::string&&);
void g(std::string&& x) { f(x); }
```

---

**`f(const std::string&)`: the expression `x` is an lvalue.** `std::string&&`
is `x`'s declared *type*; naming a variable yields an lvalue whatever its
type, and `std::string&&` refuses lvalues. So the call silently copies
instead of moving. Writing `f(std::move(x))` selects the `std::string&&`
overload.
