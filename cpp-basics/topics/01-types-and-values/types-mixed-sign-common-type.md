---
id: types-mixed-sign-common-type
kind: code
version: 1
level: 2
tags: [types, integers, conversions]
input: chips
choices:
  c1: ["unsigned int", "int", "long long"]
compile:
  harness: |
    int main() {}
requires:
  - types-promotion-rule
refs:
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://eel.is/c++draft/expr.arith.conv#1.5
---

Complete the alias so it names the type in which `apples + pears` is
computed.

```cpp
#include <type_traits>
int apples = -3;
unsigned pears = 2;
using Common = {{c1::unsigned int}};
static_assert(std::is_same_v<decltype(apples + pears), Common>);
```

---

Before `+`, `<`, `==` and the other binary operators, both operands are
converted to one common type. When a signed and an unsigned type of the
same width meet, **the signed operand converts to unsigned**: `-3` becomes
2³² − 3 (32-bit `int`), and the sum wraps to `4294967295`. The negative
operand does not keep the result signed, and the compiler does not widen
to `long long` so that both values fit.
