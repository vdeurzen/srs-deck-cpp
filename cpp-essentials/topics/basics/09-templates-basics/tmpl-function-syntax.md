---
id: tmpl-function-syntax
kind: code
version: 1
level: 1
tags: [templates]
input: chips
choices:
  c1:
    - "template <typename T>"
    - "template <T>"
    - "template <typename T>;"
    - "template <typename T, typename U>"
compile:
  harness: |
    static_assert(larger(2, 3) == 3);
    static_assert(larger(2.5, 1.5) == 2.5);
    static_assert(larger('a', 'z') == 'z');
    int main() {}
requires:
  - tmpl-why-template
  - constexpr-fn-static-assert
elaborate: Say aloud what a call like `larger(2, 3)` makes the compiler do with this definition.
refs:
  - https://en.cppreference.com/w/cpp/language/function_template
  - https://en.cppreference.com/w/cpp/language/template_parameters
---

One definition of `larger` must work for `int`, `double` and `char`
arguments. Complete the line that introduces `T`.

```cpp
{{c1::template <typename T>}}
constexpr T larger(T a, T b) { if (a < b) return b; return a; }
```

---

**`template <typename T>` introduces `T` as a type parameter.**

The line belongs to the declaration that follows, so it takes no `;`.
`template <T>` uses `T` before declaring it. An extra `U` that no
argument mentions cannot be deduced, so every call fails.
