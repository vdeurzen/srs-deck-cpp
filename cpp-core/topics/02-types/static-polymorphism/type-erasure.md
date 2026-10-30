---
id: staticpoly-type-erasure
kind: basic
version: 1
level: 3
tags: [polymorphism]
requires:
  - cpp-essentials/staticpoly-static-vs-dynamic
  - cpp-essentials/lambda-store-std-function
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/any
---

## Shapes from many libraries, including ones written later, share no base class but all have `area()`. Which technique lets one `std::vector` hold any of them, by value?

---

**Type erasure: a wrapper (like `std::function`) that stores any `T` with
`area()` behind an internal virtual interface.**

```cpp
class AnyShape {
    struct Concept { virtual ~Concept() = default; virtual double area() const = 0; };
    template<class T> struct Model : Concept {
        T t;
        explicit Model(T x) : t(std::move(x)) {}
        double area() const override { return t.area(); }
    };
    std::unique_ptr<Concept> p_;
public:
    template<class T> AnyShape(T t) : p_(std::make_unique<Model<T>>(std::move(t))) {}
    double area() const { return p_->area(); }
};
```

`std::vector<AnyShape>` then holds a `Square` and a `Circle` alike: one
type at the call site, run-time dispatch inside, usually a heap
allocation per object. For a closed set known up front, `std::variant`
would do.
