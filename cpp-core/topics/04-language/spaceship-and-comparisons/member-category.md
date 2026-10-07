---
id: spaceship-member-category
kind: code
version: 1
level: 3
tags: [comparisons]
input: chips
choices:
  c1: ["std::partial_ordering", "std::strong_ordering", "std::weak_ordering", "bool"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(Reading{} <=> Reading{}), Result>);
    int main() {}
requires:
  - spaceship-defaulted
  - spaceship-partial-ordering-nan
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
  - https://eel.is/c++draft/class.spaceship
---

Name the type that `Reading`'s defaulted `<=>` returns.

```cpp
#include <compare>
struct Reading {
    int sensor;
    double value;
    auto operator<=>(const Reading&) const = default;
};
using Result = {{c1::std\::partial_ordering}};
```

---

A defaulted `<=>` declared `auto` returns the common comparison category
of its members' results: the weakest one. `int` gives `strong_ordering`,
`double` gives `partial_ordering`, so `Reading` is only partially
ordered. Two `Reading`s holding a NaN compare unordered, and sorting them
breaks the strict weak order `std::sort` requires.
