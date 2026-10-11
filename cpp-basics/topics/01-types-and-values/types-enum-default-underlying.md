---
id: types-enum-default-underlying
kind: basic
version: 1
level: 1
tags: [types, enums, sizes]
requires:
  - types-enum-no-int
refs:
  - https://en.cppreference.com/w/cpp/language/enum
  - https://eel.is/c++draft/dcl.enum#5
---

## On x86-64 Linux, where `int` is 4 bytes, what is `sizeof(Dir)`?

```cpp
enum class Dir { north, east, south, west };
```

---

**4: an `enum class` without a named type stores its values in an `int`.**
That hidden integer is the enum's **underlying type**. Four values would
fit in one byte, but the size follows the underlying type, not the count
of enumerators. Value from an instrumented copy built with GCC 16.2
(`g++ -std=c++23`, x86-64 Linux).
