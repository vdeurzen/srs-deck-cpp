---
id: types-mixed-which-changes-value
kind: basic
version: 1
level: 3
tags: [types, conversions, mixed-recognition]
requires:
  - types-usual-arithmetic-conversions
  - types-promotion-rule
  - cast-static-cast-intro
elaborate: Say aloud which conversions you trust without a second look, and which one you would always check in a code review.
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_conversions
  - https://eel.is/c++draft/conv.integral#3
---

## With a 32-bit `int`, which numbered line stores a value different from the one it converts?

```cpp
char c = 'A';
int a = c;          // (1)
int n = -1;
unsigned u = n;     // (2)
int k = 7;
double d = k;       // (3)
```

---

**(2): `u` holds 4294967295, because a negative value cannot be unsigned.**

The conversion to `unsigned` works modulo 2³², so −1 wraps to the largest
value. (1) promotes a `char` to the wider `int`, and (3) turns 7 into
exactly 7.0: both keep the value.
