---
id: types-mixed-sign-compare
kind: basic
version: 2
level: 2
tags: [types, integers, conversions, warnings]
requires:
  - types-usual-arithmetic-conversions
  - types-size-t
elaborate: Say aloud when this warning points at a real bug rather than a harmless loop, and what you would change.
refs:
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://eel.is/c++draft/expr.arith.conv
  - https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html#index-Wsign-compare
---

```cpp
std::vector<int> v{7, 8, 9};
for (int i = 0; i < v.size(); ++i) { /* ... */ }
```

## GCC with `-Wall` warns here: *comparison of integer expressions of different signedness*. In what type is `i < v.size()` evaluated on x86-64?

---

**In the unsigned `std::size_t`: `i` is converted before comparing.**

Here `i` starts at 0 and never goes negative, so the loop is right; the
warning flags the pattern, because a negative `int` would become a huge
unsigned value. Declaring `std::size_t i = 0` makes both sides unsigned
and silences it.
