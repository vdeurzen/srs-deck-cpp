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
    - "template T"
    - "typename T"
    - "<typename T>"
compile:
  harness: |
    static_assert(larger(2, 3) == 3);
    static_assert(larger(2.5, 1.5) == 2.5);
    static_assert(larger('a', 'z') == 'z');
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/function_template
  - https://en.cppreference.com/w/cpp/language/template_parameters
---

One definition of `larger` must work for `int`, `double` and `char`
arguments. Complete the line that introduces `T`.

```cpp
{{c1::template <typename T>}}
constexpr T larger(T a, T b) { return a < b ? b : a; }
```

---

A template declaration starts with the keyword `template` and a
**template parameter list** in angle brackets; `typename T` inside it
declares `T` as a type parameter (`class T` means exactly the same). The
line applies to the one declaration that follows it.
