---
id: stdalgo-lambda-syntax
kind: code
version: 1
level: 1
tags: [lambdas]
input: chips
choices:
  c1: ["[step](int x)", "[&step](int x)", "[](int x)", "[step]"]
compile:
  harness: |
    static_assert(apply_twice() == 7);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---

Complete the lambda so `apply_twice` returns 7.

```cpp
constexpr int apply_twice() {
    int step = 3;
    auto add_step = {{c1::[step](int x)}} { return x + step; };
    step = 100;
    return add_step(add_step(1));
}
```

---

A lambda is `[captures](parameters) { body }`. `[step]` stores a **copy**
of `step` made when the lambda is created (3), so the later `step = 100`
does not affect it. `[&step]` stores a **reference** and would add 100.
`[]` captures nothing, so the body cannot use `step`. With no parameter
list the lambda takes no arguments and `x` is undeclared; a lambda that
needs none may omit `()` entirely: `[&n] { ++n; }`.
