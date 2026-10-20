---
id: stl-int-min-traps
kind: basic
version: 2
level: 2
tags: [stl, integers, undefined-behaviour, misconception, lc-7]
requires:
  - cpp-essentials/types-overflow-rules
  - stl-int-limits
  - cpp-essentials/cast-functional-notation
refs:
  - https://leetcode.com/problems/reverse-integer/
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
elaborate: "Which other one-liners fail on exactly this input: `std::abs(x)`, `x / -1`, `x % -1`?"
---

`x` is a 32-bit `int`. Many expect the `long long` accumulator to make
this digit reversal overflow-proof:

```cpp
int reverse(int x) {   // 0 if the result doesn't fit
  if (x < 0) return -reverse(-x);
  long long r = 0;
  for (; x != 0; x /= 10) r = r * 10 + x % 10;
  if (r > INT_MAX) return 0;
  return int(r);
}
```

## Which `int` input breaks it?

---

**`INT_MIN`: `-x` is not representable, so the negation is undefined behaviour.**

Typical builds wrap `-x` back to `INT_MIN` and recurse until the stack
overflows. `x % 10` keeps the sign, so drop the recursion and check both
ends after the loop: `return r > INT_MAX || r < INT_MIN ? 0 : int(r);`
