---
id: virtual-name-hiding
kind: code
version: 1
level: 3
tags: [inheritance, lookup]
input: chips
choices:
  c1: ["using Base::scale;", "using Base;", "friend struct Base;", "virtual int scale(int) const;"]
compile:
  harness: |
    static_assert(Derived{}.scale(3) == 1);
    static_assert(Derived{}.scale(3.0) == 2);
    int main() {}
requires:
  - virtual-static-dispatch
refs:
  - https://en.cppreference.com/w/cpp/language/using_declaration#In_class_definition
  - https://en.cppreference.com/w/cpp/language/unqualified_lookup#Class_definition
---

`Derived{}.scale(3)` calls the `double` version, although `Base` has an
exact `scale(int)`. Make `Base`'s overload take part again.

```cpp
struct Base {
    constexpr int scale(int) const { return 1; }
};
struct Derived : Base {
    {{c1::using Base\::scale;}}
    constexpr int scale(double) const { return 2; }
};
```

---

Name lookup stops at the first scope that declares the name: `Derived`
declares `scale`, so `Base::scale` is **hidden**, not overloaded, and `3`
quietly converts to `double`. A **using-declaration** brings the base
overloads into `Derived`'s scope, so overload resolution sees both. Virtual
functions hide the same way: overriding one overload hides the rest.
