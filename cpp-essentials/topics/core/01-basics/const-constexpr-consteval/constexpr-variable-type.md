---
id: const-constexpr-variable-type
kind: basic
version: 1
level: 2
tags: [const-constexpr-consteval]
requires:
  - const-constexpr-const-vs-constexpr-cloze
elaborate: Say aloud why a value fixed at compile time could not sensibly be changed while the program runs.
refs:
  - https://en.cppreference.com/w/cpp/language/constexpr
  - https://eel.is/c++draft/dcl.constexpr
---

## In C++23, why does `limit = 4;` fail to compile?

```cpp
constexpr int limit = 3;
int main() {
    limit = 4;
}
```

---

**`constexpr` made `limit` a `const int`.**

A `constexpr` variable is implicitly `const`: its value was fixed during
compilation, so the language forbids assigning to it later. You never
need to write `constexpr const int`.
