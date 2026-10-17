---
id: virtual-slicing
kind: trace
version: 1
level: 2
tags: [inheritance, virtual, tracing, misconception]
elaborate: Where in your code does a container hold a base class by value? What would a derived object lose on the way in?
probes:
  1: { a: "..." }
  2: { b: "woof" }
requires:
  - virtual-dispatch-dynamic-type
  - virtual-slice-parameter
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
std::vector<Animal> zoo;
zoo.push_back(Dog{});
std::string a = zoo[0].sound();    // @1
std::vector<std::unique_ptr<Animal>> pets;
pets.push_back(std::make_unique<Dog>());
std::string b = pets[0]->sound();  // @2
```

---

`zoo` stores `Animal` objects, so `push_back` **slices**: it constructs a
brand-new `Animal` from the `Animal` part of the `Dog`. That element's
dynamic type is `Animal`, forever, so it says `"..."`. `pets` stores
pointers to separately allocated objects, so the `Dog` stays whole and the
virtual call dispatches to `Dog::sound`. A container of a polymorphic
base holds `std::unique_ptr<Base>`, never `Base`. Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
