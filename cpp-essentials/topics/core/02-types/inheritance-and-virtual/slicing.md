---
id: virtual-slicing
kind: trace
version: 2
level: 2
tags: [inheritance, virtual, tracing, misconception]
elaborate: Say aloud where in your own code a container holds a base class by value, and what a derived object would lose on the way in.
probes:
  1: { a: "..." }
requires:
  - virtual-slice-parameter
  - vector-basics
  - string-basics
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/virtual
---

Many expect a container of a base class to keep each derived object's
own behaviour, as passing by reference does. Predict `a`.

```cpp
struct Animal {
    virtual std::string sound() { return "..."; }
};
struct Dog : Animal {
    std::string sound() { return "woof"; }
};
std::vector<Animal> zoo;
zoo.push_back(Dog{});
std::string a = zoo[0].sound();    // @1
```

---

`zoo` stores `Animal` objects, so `push_back` **slices**: it constructs a
brand-new `Animal` from the `Animal` part of the `Dog`. That element's
dynamic type is `Animal`, forever, so it says `"..."`. A container of a
polymorphic base holds `std::unique_ptr<Base>`, so each object stays whole.
Values verified with GCC 16.2.
