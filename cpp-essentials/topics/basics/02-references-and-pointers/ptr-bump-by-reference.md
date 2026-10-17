---
id: ptr-bump-by-reference
kind: code
version: 1
level: 1
tags: [references, functions, parameters]
requires:
  - ptr-trace-reference-assign
input: chips
choices:
  c1: ["int&", "int", "const int&", "int*"]
compile:
  harness: |
    constexpr int after_bump() {
      int x = 1;
      bump(x);
      return x;
    }
    static_assert(after_bump() == 2);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Lvalue_references
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f17-for-in-out-parameters-pass-by-reference-to-non-const
---

The caller writes `bump(x);` and expects its own `x` to go up by one.
Complete the parameter type.

```cpp
constexpr void bump({{c1::int&}} n) { ++n; }
```

---

With `int& n`, the parameter is another name for the caller's `x`, so
`++n` increments `x`, and the caller writes plain `bump(x)`. By value
(`int n`) the function increments its own copy and `x` stays 1.
`const int&` refers to `x` but forbids writes: `++n` does not compile.
`int*` would need the caller to write `bump(&x)`, and `++n` would then
move the pointer instead of changing the `int`.
