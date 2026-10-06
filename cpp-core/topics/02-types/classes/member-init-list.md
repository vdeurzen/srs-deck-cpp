---
id: class-member-init-list
kind: code
version: 1
level: 2
tags: [classes, initialization]
input: chips
choices:
  c1: [": id_(id), log_(log)", ": log_(log)", ": id_(id)", "noexcept"]
compile:
  harness: |
    static_assert(std::is_constructible_v<Sensor, int, std::string&>);
    int main() {
        std::string s;
        Sensor a(7, s);
    }
requires:
  - class-invariant-constructor
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Member_initializer_list
---

`Sensor` has a `const` id and a reference to a shared log. Complete the
constructor.

```cpp
#include <string>
#include <type_traits>
class Sensor {
    const int id_;
    std::string& log_;
public:
    Sensor(int id, std::string& log) {{c1::: id_(id), log_(log)}} {}
};
```

---

A `const` member and a reference member can only be **initialised**, never
assigned, and the member initialiser list is the one place that
initialises. By the time the constructor body runs, every member already
exists; `id_ = id;` in the body is an assignment to a `const` and fails, and
a reference left out of the list is ill-formed. Prefer the list for every
member, not only these.
