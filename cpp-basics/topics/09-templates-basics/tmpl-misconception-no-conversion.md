---
id: tmpl-misconception-no-conversion
kind: basic
version: 1
level: 2
tags: [templates, deduction, misconception]
requires:
  - tmpl-deduction-conflict
elaborate: A plain function `void append(std::vector<double>&, double)` accepts the same call. When would you rather have that than the template?
refs:
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

## `append` should behave like `void append(std::vector<double>&, double)` when given a vector of `double`, and `1` converts to `double`. What happens on the last line?

```cpp
template <typename T>
void append(std::vector<T>& v, T x) { v.push_back(x); }

std::vector<double> v;
append(v, 1);
```

---

**Compile error: no matching function.** `T` is deduced from *both*
arguments: `double` from `v`, `int` from `1`. Deduction does not apply
conversions, so the two disagree and there is no `append` to call. A
non-template function only converts because its parameter types are
already fixed. `append(v, 1.0)` compiles.
