---
id: fn-recursion-base-case
kind: code
version: 1
level: 1
tags: [functions, recursion]
input: chips
choices:
  c1: ["n == 0", "n == 1", "n > 0"]
compile:
  harness: |
    static_assert(sum_to(4) == 10);
    static_assert(sum_to(0) == 0);
    int main() {}
requires:
  - fn-recursion-trace
refs:
  - https://eel.is/c++draft/expr.call#14
  - https://en.cppreference.com/w/cpp/language/constexpr
---

`sum_to(n)` computes 1 + 2 + … + n. Complete the condition that stops the
recursion.

```cpp
constexpr int sum_to(int n) {
    if ({{c1::n == 0}}) return 0;
    return n + sum_to(n - 1);
}
```

---

The **base case** must be the smallest input, answered without recursing.
With `n == 1`, `sum_to(4)` stops one step early (returns 9) and `sum_to(0)`
recurses through −1, −2, … forever: at run time a stack overflow, here a
compile error because constant evaluation hits its depth limit. With
`n > 0`, every positive `n` returns 0 at once.
