---
id: virtual-is-a
kind: basic
version: 1
level: 1
tags: [inheritance, conversions]
refs:
  - https://en.cppreference.com/w/cpp/language/derived_class
  - https://eel.is/c++draft/conv.ptr#3
---

## Why does `service(car)` compile, while `tune(van)` does not?

```cpp
struct Vehicle { int wheels = 4; };
struct Car : public Vehicle { int seats = 5; };

void service(Vehicle& v);
void tune(Car& c);

Car car;
Vehicle van;
service(car);   // OK
tune(van);      // error
```

---

**Every `Car` is a `Vehicle`, but not every `Vehicle` is a `Car`.** A
`Car` object contains a whole `Vehicle` *base-class subobject*, so with
public inheritance a `Car&` (or `Car*`) converts implicitly to `Vehicle&`.
A plain `Vehicle` has no `seats`, so there is nothing for a `Car&` to
refer to.
