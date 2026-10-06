---
id: types-integral-promotion
kind: code
version: 1
level: 2
tags: [types, integers, conversions]
input: chips
choices:
  c1: ["int", "unsigned char", "unsigned int"]
compile:
  harness: |
    static_assert(std::is_same_v<decltype(a + b), Sum>);
    int main() {}
requires:
  - types-int-width
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
  - https://eel.is/c++draft/conv.prom
---

Complete the alias so it names the type of `a + b`.

```cpp
#include <type_traits>
unsigned char a = 200, b = 100;
using Sum = {{c1::int}};
```

---

Before any arithmetic, each operand narrower than `int` goes through
**integral promotion**: `unsigned char`
(and `char`, `short`, `bool`) becomes `int`, because `int` can hold every
value they can. So `a + b` is the `int` `300`, not a wrapped `44`; the
wrap only happens if you store the result back into an `unsigned char`.
Arithmetic in C++ never happens in a type narrower than `int`.
