---
id: spaceship-produce-default
kind: code
version: 1
level: 3
tags: [comparisons]
input: chips
choices:
  c1:
    - "auto operator<=>(const Version&) const = default;"
    - "bool operator==(const Version&) const = default;"
    - "auto operator<=>(const Version&) = default;"
compile:
  harness: |
    constexpr Version v12{1, 2}, v13{1, 3}, v20{2, 0};
    static_assert(v12 < v13 && v13 < v20 && v20 > v12);
    static_assert(v12 <= v12 && v20 >= v13);
    static_assert(v12 == Version{1, 2} && v12 != v13);
    int main() {}
requires:
  - spaceship-hand-written-no-equality
elaborate: Say in one sentence when you would write `<=>` by hand instead of defaulting it, for example when one member must not take part in the comparison.
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
---

Complete `Version` with one declaration so that all six comparisons
(`==`, `!=`, `<`, `<=`, `>`, `>=`) work, ordering by `major`, then
`minor`.

```cpp
#include <compare>
struct Version {
  int major, minor;
  {{c1::auto operator<=>(const Version&) const = default;}}
};
```

---

**A defaulted, `const` `<=>` gives all six, comparing members in
declaration order.** A defaulted `==` gives only `==` and `!=`, so `<`
fails. A defaulted comparison must be a `const` member, so the version
without `const` is rejected.
