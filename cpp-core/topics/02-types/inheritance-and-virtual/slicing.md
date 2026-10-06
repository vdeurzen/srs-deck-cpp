---
id: virtual-slicing
kind: trace
version: 1
level: 2
tags: [inheritance, virtual, tracing, misconception]
elaborate: Where in your code is a base class passed or stored by value? What would a derived object lose on the way in?
probes:
  1: { a: "woof" }
  2: { b: "..." }
requires:
  - virtual-dispatch-dynamic-type
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct Animal {
    virtual ~Animal() = default;
    virtual std::string sound() const { return "..."; }
};
struct Dog : Animal {
    std::string sound() const override { return "woof"; }
};
Dog d;
Animal& r = d;
Animal v = d;
std::string a = r.sound();   // @1
std::string b = v.sound();   // @2
```

---

`r` refers to the `Dog`, so the virtual call dispatches to `Dog::sound`.
`Animal v = d;` **slices**: it copy-constructs a brand-new `Animal` from the
`Animal` part of `d`. `v`'s dynamic type is `Animal`, forever, so it says
`"..."`. Polymorphism needs a reference or pointer; pass base classes by
`const&`, and store them as `std::unique_ptr<Animal>`, never by value.
Verified by running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
