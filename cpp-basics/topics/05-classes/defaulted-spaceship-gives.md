---
id: class-defaulted-spaceship-gives
kind: basic
version: 1
level: 2
tags: [classes, comparisons, c++20]
requires:
  - class-less-than-handwritten
  - class-default-delete-where
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
  - https://eel.is/c++draft/class.compare.default#5
---

## `Date` declares nothing but this defaulted `<=>`. Which of `a == b`, `a != b`, `a < b` and `a >= b` compile for two `Date`s?

```cpp
#include <compare>
struct Date {
    int month, day;
    auto operator<=>(const Date&) const = default;
};
```

---

**All four.** A defaulted `<=>` (three-way comparison) also declares a
defaulted `==`, and since C++20 `!=` is rewritten from `==` and `<`,
`<=`, `>`, `>=` from `<=>`. Both compare the members in declaration order:
`month` first, `day` only on a tie.
