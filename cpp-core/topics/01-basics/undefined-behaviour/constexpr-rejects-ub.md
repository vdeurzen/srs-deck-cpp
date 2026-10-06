---
id: ub-constexpr-rejects-ub
kind: basic
version: 1
level: 2
tags: [undefined-behaviour, constexpr]
requires:
  - ub-definition
refs:
  - https://en.cppreference.com/w/cpp/language/constant_expression
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#5
---

## Without the last line this compiles cleanly. With it, GCC reports an error at the `static_assert`. Why?

```cpp
constexpr int sum_all() {
  int a[4] = {1, 2, 3, 4};
  int s = 0;
  for (int i = 0; i <= 4; ++i) s += a[i];
  return s;
}
static_assert(sum_all() == 10);
```

---

**`a[4]` is an out-of-bounds read, and constant evaluation must reject
core-language undefined behaviour.** A core constant expression may not
contain core-language undefined behaviour, so evaluating `sum_all()` the
compiler walks the loop, reaches `a[4]` and must diagnose it (library UB
need not be caught). `static_assert`
tests of `constexpr` code are thus a free UB detector; at run time use
`-fsanitize=undefined,address`.
