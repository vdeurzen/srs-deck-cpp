---
id: fn-default-argument
kind: code
version: 1
level: 1
tags: [functions, default-arguments]
input: chips
choices:
  c1: ["int w, int h = 1", "int w = 1, int h", "int w, int h", "int w, int h = 0"]
compile:
  harness: |
    static_assert(area(5) == 5);
    static_assert(area(5, 2) == 10);
    int main() {}
requires:
  - constexpr-fn-static-assert
  - fn-default-argument-intro
elaborate: When would you write two overloads instead of a default argument?
refs:
  - https://en.cppreference.com/w/cpp/language/default_arguments
---

Complete the parameter list so that `area(5)` is `5` and `area(5, 2)` is
`10`.

```cpp
constexpr int area({{c1::int w, int h = 1}}) { return w * h; }
```

---

A **default argument** fills in a missing trailing argument at the call:
`area(5)` becomes `area(5, 1)`. Defaults go on the **last** parameters,
because arguments match parameters left to right: `int w = 1, int h` is an
error. Without a default, `area(5)` has too few arguments; with `h = 0` it
compiles but returns 0.
