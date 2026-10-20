---
id: class-init-list-required
kind: code
version: 1
level: 1
tags: [classes, constructors, initialization]
input: chips
choices:
  c1: [": engine_(hp)", ": Engine(hp)", ": hp(hp)", ": engine_{}"]
compile:
  harness: |
    static_assert(Car(90).power() == 90);
    int main() {}
requires:
  - class-ctor-colon-part
  - class-struct-vs-class
  - constexpr-fn-static-assert
elaborate: Which kinds of member can only be set in the initialiser list, never by assignment in the body?
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

**The member initialiser list, between `:` and the body, says how each
member is constructed;** entries name the **member** (`engine_`), not its
type. `: Engine(hp)` and `: hp(hp)` fail because `Car` has no member
with those names. `: engine_{}`, like leaving the list out,
builds `engine_` with no arguments, but `Engine` has no default
constructor: compile error.
