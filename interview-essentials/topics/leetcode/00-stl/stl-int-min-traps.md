---
id: stl-int-min-traps
kind: basic
version: 1
level: 2
tags: [stl, integers, undefined-behaviour, misconception, lc-7]
requires:
  - cpp-essentials/types-overflow-rules
refs:
  - https://leetcode.com/problems/reverse-integer/
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
elaborate: "Which other one-liners fail on exactly this input: `std::abs(x)`, `x / -1`, `x % -1`?"
---

Reverse Integer (LC 7): reverse the decimal digits of the 32-bit `int`
`x`, keeping its sign; return 0 if the result does not fit in an `int`.
A common solution:

```cpp
#include <climits>
int reverse(int x) {
    if (x < 0) return -reverse(-x);
    long long r = 0;
    for (; x != 0; x /= 10) r = r * 10 + x % 10;
    if (r > INT_MAX) return 0;
    return int(r);
}
```

## Which `int` input breaks it?

---

**`INT_MIN`. Undefined behaviour: `-x` is not representable.** Nothing
is guaranteed; typical builds wrap to `INT_MIN` and recurse until the
stack overflows, but an optimiser may do anything. Skip the negation
(`x % 10` keeps the sign):

```cpp
for (; x != 0; x /= 10) r = r * 10 + x % 10;
return r > INT_MAX || r < INT_MIN ? 0 : int(r);
```
