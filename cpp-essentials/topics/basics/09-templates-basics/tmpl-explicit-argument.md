---
id: tmpl-explicit-argument
kind: code
version: 1
level: 2
tags: [templates, deduction]
requires:
  - tmpl-deduction-conflict
input: chips
choices:
  c1: ["double", "int", "long", "float"]
compile:
  harness: |
    static_assert(r == 2.1, "r does not hold the larger value");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Template_argument_deduction
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

`maximum(1, 2.1)` alone does not compile. Complete the call so that it
does and `r == 2.1` holds.

```cpp
template <typename T>
constexpr T maximum(T a, T b) { return a < b ? b : a; }

constexpr auto r = maximum<{{c1::double}}>(1, 2.1);
```

---

Writing the **template argument** explicitly in angle brackets skips
deduction for `T`. With `T` fixed, the arguments are ordinary function
arguments again and convert as usual: `1` becomes `1.0`. Choosing `int`
(or `long`) also compiles, but truncates `2.1` to `2`. `float` rounds
the `double` literal `2.1` to the nearest `float`, which is not `2.1`.
