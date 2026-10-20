---
id: stl-const-auto-param
kind: basic
version: 1
level: 2
tags: [stl, foundations, templates, references]
requires:
  - cpp-essentials/tmpl-auto-param-cloze
  - cpp-essentials/iter-range-for-const-auto-ref
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Abbreviated_function_template
  - https://en.cppreference.com/w/cpp/language/reference
elaborate: Say aloud which function in your own code takes a container by value only to read it, and what `const auto&` would change for its callers.
---

```cpp
constexpr int total(const auto& v) {
  int s = 0;
  for (int x : v) s += x;
  return s;
}
```

## `total` is called with a `std::vector<int>` of a million elements. How many of them are copied into `v`?

---

**None: `const auto&` is a read-only reference to whatever type is passed.**

The `auto` makes `total` a template, so one body serves a vector, an
array or a span; the `const&` binds the caller's object as
`const std::vector<int>&` would. Plain `auto v` would copy all million.
