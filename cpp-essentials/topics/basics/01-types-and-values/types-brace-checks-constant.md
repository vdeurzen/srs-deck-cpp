---
id: types-brace-checks-constant
kind: code
version: 3
level: 3
tags: [types, initialization, narrowing]
input: chips
choices:
  c1: ["signed char", "unsigned char", "bool"]
compile:
  harness: |
    static_assert(sizeof(small) == 1);
    int main() {}
requires:
  - types-brace-narrowing-intro
  - types-signed-unsigned-range
  - const-vs-constexpr-initializer
elaborate: Say where in your code an `=` initialisation could silently squash a value that braces would have refused.
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
  - https://eel.is/c++draft/dcl.init.list#7
---

`small` is brace-initialised from the `int` constant `code`. Choose the
one-byte type for which this line compiles.

```cpp
constexpr int code = 200;
constexpr {{c1::unsigned char}} small{code};
```

---

**From a constant, braces check the actual value: only `unsigned char` holds 200.**

`int` to a one-byte type is narrowing in general, but for a constant
source the compiler accepts it when the value fits: `unsigned char` holds
0..255. `signed char` (−128..127) and `bool` would change 200, so braces
reject both. With `=`, all three compile.
