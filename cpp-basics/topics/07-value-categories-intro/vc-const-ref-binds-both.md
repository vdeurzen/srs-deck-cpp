---
id: vc-const-ref-binds-both
kind: code
version: 1
level: 1
tags: [value-categories, references, temporaries]
requires:
  - vc-plain-ref-rejects-temporary
input: chips
choices:
  c1: ["const int&", "int&", "int&&", "int*"]
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://eel.is/c++draft/dcl.init.ref#5
---

`twice` takes its argument by reference. Complete the parameter type so
both assertions compile.

```cpp
constexpr int twice({{c1::const int&}} x) { return x * 2; }
constexpr int limit = 5;
static_assert(twice(limit) == 10);
static_assert(twice(21) == 42);
```

---

`limit` is an lvalue of type `const int`; `21` is a prvalue. Only
`const int&` binds both: for `21` the compiler materialises a temporary
`int` and binds the reference to it, which is safe because `x` cannot
write. `int&` rejects the temporary (and also `limit`, which is const).
`int&&` binds only rvalues, so it rejects `limit`. `int*` would need
`&limit`, and `&21` is not possible at all.
