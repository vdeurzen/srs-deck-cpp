---
id: const-constexpr-const-not-constant
kind: basic
version: 1
level: 2
tags: [const-constexpr-consteval, misconception]
requires:
  - const-constexpr-const-vs-constexpr-cloze
elaborate: Find a `const` local in your code used as a size or template argument. Would writing `constexpr` instead have caught a run-time initializer at the declaration rather than at the use?
refs:
  - https://en.cppreference.com/w/cpp/language/constant_expression#Usable_in_constant_expressions
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#4
---

## "`n` is `const`, so it is a compile-time constant." What happens here?

```cpp
int read_count();
void fill() {
    const int n = read_count();
    std::array<int, n> buf{};
}
```

---

**Compile error: `n` is not usable in a constant expression.** A `const`
integer counts as a constant only when its *initializer* is one; the
belief comes from `const int k = 4;`, which does qualify. `const` says "not
modified", nothing about when the value is known. `constexpr int n = ...`
states the intent and fails at the declaration instead.
