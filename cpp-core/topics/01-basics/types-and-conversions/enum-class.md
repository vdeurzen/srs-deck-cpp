---
id: types-enum-class
kind: code
version: 1
level: 1
tags: [types, enums, conversions]
input: chips
choices:
  c1: ["enum class", "enum", "typedef enum"]
compile:
  harness: |
    static_assert(!std::is_convertible_v<Signal, int>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/enum#Scoped_enumerations
---

Complete the declaration so a `Signal` never turns silently into an
integer, in arithmetic, comparisons or function arguments.

```cpp
#include <type_traits>
{{c1::enum class}} Signal { red, green };
```

---

A **scoped enumeration** (`enum class`, or `enum struct`) has no implicit
conversion to its underlying type, so `int n = Signal::red;` or
`s + 1` is a compile error rather than a silent number. A plain `enum`
converts to `int` anywhere an integer fits. `typedef enum` is the C
spelling of the same unscoped enum.
