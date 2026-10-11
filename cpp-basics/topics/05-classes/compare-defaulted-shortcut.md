---
id: class-compare-defaulted-shortcut
kind: code
version: 1
level: 2
tags: [classes, comparisons, operators, c++20]
input: chips
choices:
  c1:
    - "auto operator<=>(const Date&) const"
    - "bool operator<(const Date&) const"
    - "bool operator==(const Date&) const"
compile:
  harness: |
    static_assert(Date{1, 31} < Date{2, 1});
    static_assert(Date{4, 2} == Date{4, 2});
    static_assert(Date{4, 2} != Date{4, 3});
    static_assert(Date{6, 1} >= Date{5, 30});
    int main() {}
requires:
  - class-less-than-handwritten
  - class-defaulted-spaceship-gives
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
  - https://eel.is/c++draft/class.compare.default
---

Complete the one declaration so that two `Date`s can be compared with
both `==` and `<`, by `month` first and by `day` only on a tie.

```cpp
#include <compare>
struct Date {
    int month, day;
    {{c1::auto operator<=>(const Date&) const}} = default;
};
```

---

Only the defaulted three-way comparison gives both. Defaulting `<` alone
needs a `<=>` to build on, so here it is defined as deleted; defaulting
`==` gives equality only, so `<` does not compile.
