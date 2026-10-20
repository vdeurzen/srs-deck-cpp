---
id: cast-functional-notation
kind: basic
version: 2
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

## Written with `static_cast`, what is `int(g.size())`?

---

**`static_cast<int>(g.size())`: `T(e)` with one argument is a cast, written like a call.**

`int` is a type, not a function. Between arithmetic types this
*functional cast* converts exactly as `static_cast<int>(e)` does. Here it
turns the unsigned size into an `int`, so `i < ...` compares two `int`s.
