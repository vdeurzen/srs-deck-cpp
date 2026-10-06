---
id: lambda-mutable
kind: code
version: 1
level: 2
tags: [lambdas]
requires:
  - lambda-capture-trace
input: chips
choices:
  c1: ["mutable", "constexpr", "noexcept", "static"]
compile:
  harness: |
    static_assert(check());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
---

Complete the lambda so each call returns one more than the last,
counting in the closure's own copy and leaving the local `count` at 0.

```cpp
constexpr bool check() {
    int count = 0;
    auto next = [count]() {{c1::mutable}} { return ++count; };
    next();
    return next() == 2 && count == 0;
}
```

---

A closure's `operator()` is `const` by default, so `++count` on a
by-value capture does not compile. `mutable` drops that `const`; the
closure's copy changes, the outer `count` does not. `static` (C++23)
forbids captures entirely; `constexpr` and `noexcept` leave the call
operator `const`.
