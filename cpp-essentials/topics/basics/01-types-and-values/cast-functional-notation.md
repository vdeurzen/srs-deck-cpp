---
id: cast-functional-notation
kind: basic
version: 1
level: 1
tags: [types, conversions, casts]
requires:
  - cast-static-cast-intro
  - types-size-t
refs:
  - https://en.cppreference.com/w/cpp/language/explicit_cast
  - https://eel.is/c++draft/expr.type.conv
elaborate: Say which spelling you would ask for in a code review, `int(x)` or `static_cast<int>(x)`, and why.
---

```cpp
std::vector<int> g{4, 8, 15};
for (int i = 0; i < int(g.size()); ++i) {
    // ...
}
```

## `g.size()` is a `std::size_t`. What does `int(g.size())` do?

---

**Converts the size to an `int`: `T(e)` is a cast, written like a call.**
With one argument, `int(e)` is an explicit conversion of `e` to `int`;
between arithmetic types it does exactly what `static_cast<int>(e)`
does. Here it makes `i < ...` a comparison of two `int`s.
