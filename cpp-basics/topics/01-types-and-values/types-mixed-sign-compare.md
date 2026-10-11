---
id: types-mixed-sign-compare
kind: basic
version: 1
level: 2
tags: [types, integers, conversions]
requires:
  - types-overflow-rules
  - types-promotion-rule
refs:
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://eel.is/c++draft/expr.arith.conv
  - https://en.cppreference.com/w/cpp/utility/intcmp
---

## When an `int` is compared with an `unsigned int`, the `int` is first converted to `unsigned`. With a 32-bit `int`, is the branch taken?

```cpp
int balance = -5;
unsigned limit = 10;
if (balance < limit) { /* within limit */ }
```

---

**No.** Converting `-5` to a 32-bit `unsigned` wraps modulo 2³², giving
`4294967291`, which is not less than `10`.
GCC's `-Wall` warns (`-Wsign-compare`). Compare with `std::cmp_less`
(C++20), or keep both values signed.
