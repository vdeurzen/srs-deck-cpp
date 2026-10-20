---
id: types-mixed-sign-compare
kind: basic
version: 1
level: 2
tags: [types, integers, conversions]
requires:
  - types-usual-arithmetic-conversions
elaborate: Where in your code does a signed count meet an unsigned size in a comparison, and which side would you change?
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

**No: `balance` is converted to `unsigned` before comparing.**
The usual arithmetic conversions wrap `-5` modulo 2³² to `4294967291`,
which is not less than `10`.
Compilers can warn about this mix; the fix is to keep both values
signed.
