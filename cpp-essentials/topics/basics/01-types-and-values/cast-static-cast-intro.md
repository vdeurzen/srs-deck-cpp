---
id: cast-static-cast-intro
kind: basic
version: 1
level: 1
tags: [types, conversions, casts]
refs:
  - https://en.cppreference.com/w/cpp/language/static_cast
  - https://eel.is/c++draft/expr.static.cast
---

## `f` is `0.0`, because `int / int` drops the fraction. What value does `g` get?

```cpp
int done = 1, total = 4;
double f = done / total;
double g = static_cast<double>(done) / total;
```

---

**`0.25`: `static_cast<double>(done)` converts the value 1 to the `double` 1.0.**

`static_cast<T>(e)` is C++'s named conversion of the value of `e` to type
`T`. With one `double` operand, `total` converts too, so the division is
done in `double`. `done` itself stays an `int`.
