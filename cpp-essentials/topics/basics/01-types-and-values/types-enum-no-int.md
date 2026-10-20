---
id: types-enum-no-int
kind: basic
version: 1
level: 1
tags: [types, enums, conversions]
requires:
  - cast-static-cast-intro
refs:
  - https://en.cppreference.com/w/cpp/language/enum#Scoped_enumerations
  - https://eel.is/c++draft/dcl.enum#11
elaborate: Where in your code is an enum value passed to an `int` parameter or compared with a bare number, and would you want that to compile?
---

## `enum` and `enum class` each declare a type with a set of named integer constants. Exactly one line in `f` fails to compile. Which one?

```cpp
enum Fruit { apple, pear };
enum class Gear { low, high };

void f() {
    int a = pear;
    int b = Gear::high;
    bool up = Gear::low < Gear::high;
}
```

---

**`int b = Gear::high;`: a scoped enum never converts to an integer
on its own.** Comparing two `Gear`s is fine; they share a type. The plain
`pear` silently becomes `1`, so `pear == 1` or passing it to an `int`
parameter compiles by accident. When you want the number, say so:
`static_cast<int>(Gear::high)`.
