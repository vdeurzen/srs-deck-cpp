---
id: variadic-fold-empty-pack
kind: code
version: 1
level: 2
tags: [templates, variadic]
requires:
  - variadic-fold-order
input: chips
choices:
  c1: ["(0 + ... + args)", "(... + args)", "(args + ...)", "(0 + args...)"]
compile:
  harness: |
    static_assert(sum() == 0);
    static_assert(sum(1, 2, 3) == 6);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/fold
---

Complete `sum` so it also works when called with no arguments.

```cpp
template<typename... Ts>
constexpr int sum(Ts... args) { return {{c1::(0 + ... + args)}}; }
```

---

A **unary** fold over an empty pack is ill-formed for `+` (only `&&`,
`||` and `,` have an empty value). A **binary** fold supplies the
initial value: `(0 + ... + args)` is `0` for no arguments and
`((0 + 1) + 2) + 3` otherwise.
