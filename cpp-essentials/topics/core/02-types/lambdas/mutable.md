---
id: lambda-mutable
kind: code
version: 1
level: 2
tags: [lambdas]
requires:
  - lambda-capture-trace
  - constexpr-fn-static-assert
input: chips
choices:
  c1: ["mutable", "static", "const"]
compile:
  harness: |
    static_assert(check());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
elaborate: When would you rather capture by reference than make a by-copy capture changeable, and what must then outlive the closure object?
---

Complete the lambda expression so each call returns one more than the last,
counting in the closure object's own copy and leaving the local `count` at 0.

```cpp
constexpr bool check() {
    int count = 0;
    auto next = [count]() {{c1::mutable}} { return ++count; };
    next();
    return next() == 2 && count == 0;
}
```

---

A closure type's `operator()` is `const` by default, so `++count` on a
by-value capture does not compile. `mutable` drops that `const`; the
closure object's copy changes, the outer `count` does not. `static` (C++23) is
allowed only on a lambda expression that captures nothing, and `const` is not a
lambda specifier at all.
