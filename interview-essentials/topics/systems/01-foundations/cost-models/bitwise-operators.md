---
id: foundations-bitwise-operators
kind: basic
version: 1
level: 1
tags: [foundations, bit-tricks, vocabulary]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_shift_operators
---

## C++ works on the bits of an unsigned integer one position at a time. From the rows given, what is `x ^ y`?

```
x      = 0b1100        (12)
y      = 0b1010        (10)
x & y  = 0b1000        1 where both are 1
x | y  = 0b1110        1 where either is 1
x << 1 = 0b11000       bits move left one place
x >> 2 = 0b0011        bits move right two places
x ^ y  = …
```

---

**`0b0110` (6): `^` is 1 where the two bits differ (exclusive or).**

`&`, `|` and `^` each pair bit k of one operand with bit k of the
other. So `a ^ a == 0` and `a ^ 0 == a`. Shifting left by k multiplies
by 2ᵏ.
