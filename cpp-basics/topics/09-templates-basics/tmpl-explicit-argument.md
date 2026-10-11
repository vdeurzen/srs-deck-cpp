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
  c1: ["double", "int", "long", "auto"]
compile:
  harness: |
    static_assert(r == 2.5, "the larger value was not kept exactly");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Template_argument_deduction
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

`maximum(1, 2.5)` alone does not compile. Complete the call so that it
does, and `r` holds the larger value exactly.

```cpp
template <typename T>
constexpr T maximum(T a, T b) { return a < b ? b : a; }

constexpr auto r = maximum<{{c1::double}}>(1, 2.5);
```

---

Writing the **template argument** explicitly in angle brackets skips
deduction for `T`. With `T` fixed, the arguments are ordinary function
arguments again and convert as usual: `1` becomes `1.0`. Choosing `int`
(or `long`) also compiles, but truncates `2.5` to `2`. `auto` is not a
type and cannot be a template argument.
