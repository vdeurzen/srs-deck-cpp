---
id: types-enum-scope
kind: code
version: 1
level: 2
tags: [types, enums]
input: chips
choices:
  c1: ["Signal::red", "red", "Signal(red)", "0"]
compile:
  harness: |
    static_assert(stop == Signal{});
    int main() {}
requires:
  - types-enum-class
refs:
  - https://en.cppreference.com/w/cpp/language/enum#Scoped_enumerations
---

The namespace already has a colour constant called `red`. Complete the
initializer so `stop` holds the first enumerator.

```cpp
enum class Signal { red, green };
constexpr int red = 0xFF0000;
constexpr Signal stop = {{c1::Signal\::red}};
```

---

A scoped enumeration keeps its enumerators inside its own scope, so they
are always named `Signal::red`, and `red` alone still means the colour
constant. With a plain `enum`, `red` would be injected into the namespace
and the second declaration would not compile. The cast `Signal(red)`
compiles but converts `0xFF0000`, which is not `Signal::red`.
