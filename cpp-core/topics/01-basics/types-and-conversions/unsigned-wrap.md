---
id: types-unsigned-wrap
kind: code
version: 1
level: 2
tags: [types, integers, undefined-behaviour, constexpr]
input: chips
choices:
  c1: ["unsigned int", "int", "long long"]
compile:
  harness: |
    static_assert(next(top) == 0);
    int main() {}
requires:
  - types-signed-overflow-ub
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://eel.is/c++draft/expr.const.core
---

A sequence counter must roll over from its maximum back to `0`, and the
roll-over must be well-defined. Complete the type.

```cpp
#include <limits>
using Counter = {{c1::unsigned int}};
constexpr Counter next(Counter c) { return c + 1; }
constexpr Counter top = std::numeric_limits<Counter>::max();
```

---

Unsigned arithmetic wraps modulo 2ᴺ by definition, so `next(top)` is `0`.
For any signed type, `top + 1` overflows: undefined behaviour, which a
constant expression is not allowed to contain, so the compiler rejects
`next(top)` outright. A wider signed type only moves the cliff.
`constexpr` evaluation is a cheap UB detector for exactly this reason.
