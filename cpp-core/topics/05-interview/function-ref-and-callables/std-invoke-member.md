---
id: callables-std-invoke-member
kind: code
version: 1
level: 3
tags: [callables]
input: chips
choices:
  c1: ["&Greeter::shout", "&Greeter", "Greeter::shout", "g.shout"]
compile:
  harness: |
    static_assert(check());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/invoke
---

Call `Greeter::shout` on `g` through `std::invoke`, the same way you would
call a free function or a lambda through it.

```cpp
#include <functional>
struct Greeter { constexpr int shout(int volume) const { return volume * 2; } };
constexpr bool check() {
    Greeter g;
    return std::invoke({{c1::&Greeter\::shout}}, g, 3) == 6;
}
```

---

`std::invoke(f, args...)` handles every kind of callable uniformly,
including a pointer-to-member-function, where ordinary call syntax
(`f(args...)`) does not work at all — you cannot call `&Greeter::shout`
directly. This is what makes `std::invoke` the right primitive for
generic code that receives an arbitrary callable and does not know in
advance whether it is a function, a lambda, or a member function pointer.
