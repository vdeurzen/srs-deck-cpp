---
id: virtual-pure-abstract
kind: code
version: 1
level: 2
tags: [inheritance, virtual, interfaces]
input: chips
choices:
  c1: ["= 0", "= delete", "= default", "{}"]
compile:
  harness: |
    static_assert(std::is_abstract_v<Codec>);
    static_assert(!std::is_abstract_v<Gzip>);
    int main() {}
requires:
  - virtual-static-dispatch
refs:
  - https://en.cppreference.com/w/cpp/language/abstract_class
---

`Codec` is an interface: nobody may create a bare `Codec`, and every
concrete codec must supply `encode`. Finish the declaration.

```cpp
#include <type_traits>
struct Codec {
    virtual ~Codec() = default;
    virtual int encode(int) const {{c1::= 0}};
};
struct Gzip : Codec {
    int encode(int x) const override { return x + 1; }
};
```

---

`= 0` declares a **pure virtual** function: the class becomes **abstract**,
so `Codec c;` does not compile, and a derived class stays abstract until it
overrides every pure virtual. That is C++'s interface: a class of pure
virtuals plus a virtual destructor. `{}` gives a default body, so derived
classes may silently forget `encode`; `= delete` and `= default` do not
make a class abstract (and `= default` is only for special members).
