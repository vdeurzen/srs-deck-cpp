---
id: virtual-pure-syntax
kind: cloze
version: 1
level: 1
tags: [inheritance, virtual, abstract]
requires:
  - virtual-enable-dispatch
refs:
  - https://en.cppreference.com/w/cpp/language/abstract_class
---

`Shape` has no sensible area of its own, so it declares `area` but gives
it no implementation, and requires every derived class to provide one:

```cpp
struct Shape {
  virtual ~Shape() = default;
  virtual double area() const {{c1::= 0::two tokens before the semicolon}};
};
```

Such a function is called *pure virtual*. A class with at least one of
them is {{c2::abstract::a class category}}:
`Shape s;` does not compile, but `Shape&` and `Shape*` are fine.
