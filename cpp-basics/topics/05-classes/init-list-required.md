---
id: class-init-list-required
kind: code
version: 1
level: 1
tags: [classes, constructors, initialization]
input: chips
choices:
  c1: [": engine_(hp)", ": Engine(hp)", "noexcept"]
compile:
  harness: |
    static_assert(Car(90).power() == 90);
    int main() {}
requires:
  - class-constructor-intro
  - class-struct-vs-class
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Member_initializer_list
---

Complete `Car`'s constructor so that `Car(90).power()` is 90.

```cpp
struct Engine {
    int hp;
    constexpr Engine(int h) : hp(h) {}
};
class Car {
    Engine engine_;
public:
    constexpr Car(int hp) {{c1::: engine_(hp)}} {}
    constexpr int power() { return engine_.hp; }
};
```

---

The **member initialiser list**, between `:` and the body, says how each
member is constructed; entries name the **member** (`engine_`), not its
type. Leave it out (the `noexcept` choice) and `engine_` must be built with
no arguments, but `Engine` has no default constructor: compile error.
`: Engine(hp)` fails because `Car` has no member or base called `Engine`.
