---
id: staticpoly-type-erasure-skeleton
kind: chunk
version: 1
level: 3
tags: [polymorphism, type-erasure, idioms]
requires:
  - staticpoly-type-erasure
expose_ms: 9000
compile:
  harness: |
    #include <memory>
    #include <vector>
    struct Sq { double s; double area() const { return s * s; } };
    struct Ci { double r; double area() const { return 3 * r * r; } };
    int main() {
      std::vector<std::unique_ptr<Concept>> v;
      auto a = std::make_unique<Model<Sq>>(); a->obj = Sq{2};
      auto b = std::make_unique<Model<Ci>>(); b->obj = Ci{1};
      v.push_back(std::move(a));
      v.push_back(std::move(b));
      return v[0]->area() + v[1]->area() == 7 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/language/abstract_class
---

```cpp
struct Concept {
  virtual ~Concept() = default;
  virtual double area() const = 0;
};
template<class T> struct Model : Concept {
  T obj; double area() const override { return obj.area(); }
};
```

---

The **concept/model** core of type erasure. `Concept` is the internal
virtual interface; `Model<T>` wraps any `T` with `area()` and forwards to
it, so `T` needs no base class. The virtual destructor lets an owning
`unique_ptr<Concept>` delete the right `Model`. A wrapper class holding
that pointer (as `std::function` does) completes the idiom.
