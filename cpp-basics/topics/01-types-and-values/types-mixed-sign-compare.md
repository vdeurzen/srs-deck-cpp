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

## With a 32-bit `int`, is the branch taken?

```cpp
int balance = -5;
unsigned limit = 10;
if (balance < limit) { /* within limit */ }
```

---

**No.** When `int` meets `unsigned int`, the `int` converts to
`unsigned`, so `-5` becomes `4294967291`, which is not less than `10`.
GCC's `-Wall` warns (`-Wsign-compare`). Compare with `std::cmp_less`
(C++20), or keep both values signed.
