---
id: virtual-still-abstract
kind: basic
version: 1
level: 2
tags: [inheritance, virtual, abstract]
requires:
  - virtual-pure-syntax
refs:
  - https://en.cppreference.com/w/cpp/language/abstract_class
---

## `Square` overrides `area`. Why does `Square sq;` still fail to compile?

```cpp
struct Shape {
  virtual ~Shape() = default;
  virtual double area() const = 0;
  virtual double perimeter() const = 0;
};
struct Square : Shape {
  double side = 1.0;
  double area() const override { return side * side; }
};

Square sq;   // error
```

---

**`Square` inherits `perimeter` still pure, so it is abstract too.** A
derived class only becomes concrete once *every* pure virtual function it
inherits has an override. The compiler names the missing one in the
error, which is the point: you cannot forget a required function.
