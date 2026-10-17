---
id: class-explicit-constructor
kind: code
version: 1
level: 2
tags: [classes, conversions]
input: chips
choices:
  c1: ["explicit", "constexpr", "inline", "noexcept"]
compile:
  harness: |
    static_assert(std::is_constructible_v<Meters, double>);
    static_assert(!std::is_convertible_v<double, Meters>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/explicit
  - https://en.cppreference.com/w/cpp/language/converting_constructor
---

Today `set_height(1.8)` compiles, and nobody can tell whether `1.8` was
metres or feet. Make the caller write `set_height(Meters{1.8})`.

```cpp
#include <type_traits>
class Meters {
    double value_;
public:
    {{c1::explicit}} Meters(double v) : value_(v) {}
};
void set_height(Meters);
```

---

A constructor callable with one argument is a **converting constructor**:
the compiler uses it silently wherever a `Meters` is expected and a `double`
is given. `explicit` keeps direct construction (`Meters{1.8}`) and removes
the implicit conversion, so a raw number can no longer pose as a unit.
Default to `explicit` on single-argument constructors; leave it off only
when the conversion is genuinely lossless and unsurprising.
