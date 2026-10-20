---
id: types-signed-unsigned-range
kind: basic
version: 1
level: 1
tags: [types, integers, signedness]
elaborate: Say in one sentence why a counter that must go below zero should not be declared unsigned.
refs:
  - https://en.cppreference.com/w/cpp/language/types#Range_of_values
  - https://eel.is/c++draft/basic.fundamental
---

## Both variables are 8 bits wide. What range of values can each one hold?

```cpp
unsigned char u;
signed char s;
```

---

**`u` holds 0..255, `s` holds −128..127: the signed type spends half its patterns on negatives.**

Same 256 bit patterns, read two ways. An unsigned type has no negative
values at all; the same split holds for `unsigned int` versus `int` at
their own width.
