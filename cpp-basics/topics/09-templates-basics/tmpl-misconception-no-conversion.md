---
id: tmpl-misconception-no-conversion
kind: basic
version: 1
level: 2
tags: [templates, deduction, misconception]
requires:
  - tmpl-deduction-conflict
elaborate: A plain function `void put(double&, double)` accepts the same call. When would you rather have that than the template?
refs:
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

## `put` should behave like `void put(double&, double)` when given a `double`, and `1` converts to `double`. What happens on the last line?

```cpp
template <typename T>
void put(T& dst, T x) { dst = x; }

double d = 0;
put(d, 1);
```

---

**Compile error: no matching function.** `T` is deduced from *both*
arguments: `double` from `d`, `int` from `1`. Deduction does not apply
conversions, so the two disagree and there is no `put` to call. A
non-template function only converts because its parameter types are
already fixed. `put(d, 1.0)` compiles.
