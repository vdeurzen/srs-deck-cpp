---
id: value-categories-overload-binding
kind: basic
version: 1
level: 2
tags: [value-categories, overload-resolution]
requires:
  - vc-named-rvalue-ref-is-lvalue
elaborate: Where in your own code does a function take a `T&&` and pass it on, and does it pass it on as an lvalue?
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://en.cppreference.com/w/cpp/language/reference
---

## Which overload of `f` does the call inside `g` pick?

```cpp
struct Doc {};
void f(const Doc&);
void f(Doc&&);
void g(Doc&& x) { f(x); }
```

---

**`f(const Doc&)`: the expression `x` is an lvalue.** `Doc&&` is `x`'s
declared *type*; naming a variable yields an lvalue whatever its type,
and `Doc&&` refuses lvalues. So the call silently copies instead of
moving. Writing `f(std::move(x))` selects the `Doc&&` overload.
